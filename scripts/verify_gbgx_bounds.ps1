Add-Type -AssemblyName System.Drawing

$bmp = [System.Drawing.Bitmap]::FromFile("a:\GBGCabs\assets\gbgx_official_white.png")

$minX = $bmp.Width; $maxX = 0; $minY = $bmp.Height; $maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        if ($c.A -gt 10) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output ("Dimensions: {0}x{1}" -f $bmp.Width, $bmp.Height)
Write-Output ("Content: X={0}..{1}, Y={2}..{3}" -f $minX, $maxX, $minY, $maxY)
$bmp.Dispose()
