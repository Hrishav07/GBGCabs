Add-Type -AssemblyName System.Drawing

$srcPath = "a:\GBGCabs\assets\Screenshot 2026-08-31 150402.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

$minX = $bmp.Width
$maxX = 0
$minY = $bmp.Height
$maxY = 0

for ($y = 0; $y -lt $bmp.Height; $y++) {
    for ($x = 0; $x -lt $bmp.Width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        # Check if brightness > 80 (letters)
        if ($c.R -gt 80 -or $c.G -gt 80 -or $c.B -gt 80) {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
        }
    }
}

Write-Output ("Dimensions: {0}x{1}" -f $bmp.Width, $bmp.Height)
Write-Output ("Letters Box: X={0}..{1} (w={2}), Y={3}..{4} (h={5})" -f $minX, $maxX, ($maxX - $minX + 1), $minY, $maxY, ($maxY - $minY + 1))

$bmp.Dispose()
