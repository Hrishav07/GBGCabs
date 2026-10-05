Add-Type -AssemblyName System.Drawing

$srcPath = "a:\GBGCabs\assets\Screenshot 2026-08-31 150402.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Exact tight crop:
# X: 28 to 235 (w = 208)
# Y: 53 to 71 (h = 19)
$cropX = 28
$cropY = 53
$cropW = 208
$cropH = 19

$scale = 4
$outW = $cropW * $scale
$outH = $cropH * $scale

$whiteBmp = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$blueBmp  = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $c = $bmp.GetPixel($cropX + $x, $cropY + $y)
        $brightness = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
        
        $alpha = 0
        if ($brightness -gt 40) {
            $normalized = ($brightness - 40) / (255 - 40)
            if ($normalized -gt 1) { $normalized = 1 }
            $alpha = [int]($normalized * 255)
        }
        
        if ($alpha -gt 0) {
            $whiteColor = [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255)
            $blueColor  = [System.Drawing.Color]::FromArgb($alpha, 37, 99, 235)
            
            for ($dy = 0; $dy -lt $scale; $dy++) {
                for ($dx = 0; $dx -lt $scale; $dx++) {
                    $whiteBmp.SetPixel($x * $scale + $dx, $y * $scale + $dy, $whiteColor)
                    $blueBmp.SetPixel($x * $scale + $dx, $y * $scale + $dy, $blueColor)
                }
            }
        }
    }
}

$whiteBmp.Save("a:\GBGCabs\assets\gbgx_logo_white.png", [System.Drawing.Imaging.ImageFormat]::Png)
$blueBmp.Save("a:\GBGCabs\assets\gbgx_logo_blue.png", [System.Drawing.Imaging.ImageFormat]::Png)
$whiteBmp.Save("a:\GBGCabs\public\gbgx_logo_white.png", [System.Drawing.Imaging.ImageFormat]::Png)
$blueBmp.Save("a:\GBGCabs\public\gbgx_logo_blue.png", [System.Drawing.Imaging.ImageFormat]::Png)

$whiteBmp.Dispose()
$blueBmp.Dispose()
$bmp.Dispose()

Write-Output "Generated tight-cropped logos: $outW x $outH"
