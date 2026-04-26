# Reads each hike_db.json entry's KML track and computes the geographic centre
# (midpoint of bounding box) to set map_latitude / map_longitude.
# Run from any directory; paths are resolved relative to this script.

$root    = Split-Path $PSScriptRoot -Parent
$dbPath  = Join-Path $root 'outdoors\hike_db.json'
$outBase = Join-Path $root 'outdoors'

$json = Get-Content $dbPath -Raw | ConvertFrom-Json

$updated  = 0
$notfound = 0
$nocoords = 0

foreach ($prop in $json.PSObject.Properties) {
    $id = $prop.Name
    $h  = $prop.Value

    if (-not $h.track) { continue }

    $hikePath = $id -replace '/', '\'
    $kmlPath  = Join-Path $outBase "$hikePath\$($h.track)"

    if (-not (Test-Path $kmlPath)) {
        Write-Host "NOT FOUND  $id -> $($h.track)"
        $notfound++
        continue
    }

    $content = Get-Content $kmlPath -Raw
    $m = [regex]::Match($content, '<coordinates>([\s\S]*?)</coordinates>')
    if (-not $m.Success) {
        Write-Host "NO COORDS  $id"
        $nocoords++
        continue
    }

    $lons = [System.Collections.Generic.List[double]]::new()
    $lats = [System.Collections.Generic.List[double]]::new()

    [regex]::Matches($m.Groups[1].Value, '(-?[\d.]+),(-?[\d.]+)') | ForEach-Object {
        $lons.Add([double]$_.Groups[1].Value)
        $lats.Add([double]$_.Groups[2].Value)
    }

    if ($lons.Count -eq 0) { $nocoords++; continue }

    $lonStats = $lons | Measure-Object -Minimum -Maximum
    $latStats = $lats | Measure-Object -Minimum -Maximum

    $h.map_longitude = [Math]::Round(($lonStats.Minimum + $lonStats.Maximum) / 2, 5)
    $h.map_latitude  = [Math]::Round(($latStats.Minimum + $latStats.Maximum) / 2, 5)
    $updated++
}

$json | ConvertTo-Json -Depth 10 | Set-Content $dbPath -Encoding utf8
Write-Host "Done - updated: $updated | KML not found: $notfound | no coords: $nocoords"
