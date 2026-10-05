Add-Type -AssemblyName System.Drawing

$srcPath = "a:\GBGCabs\assets\Screenshot 2026-08-31 150402.png"
$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)

# Tight crop of the letters
# X: 26 to 237, Y: 51 to 73
$cropX = 26
$cropY = 51
$cropW = 237 - 26 + 1
$cropH = 73 - 51 + 1

# Create 2x or 4x supersampled clean PNGs with transparent background
# 1. White logo (for dark background)
# 2. Electric Blue logo (for light background)

$scale = 4
$outW = $cropW * $scale
$outH = $cropH * $scale

$whiteBmp = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$blueBmp  = New-Object System.Drawing.Bitmap($outW, $outH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Sample pixels
for ($y = 0; $y -lt $cropH; $y++) {
    for ($x = 0; $x -lt $cropW; $x++) {
        $c = $bmp.GetPixel($cropX + $x, $cropY + $y)
        # Brightness determines alpha
        $brightness = [Math]::Max($c.R, [Math]::Max($c.G, $c.B))
        
        # Calculate alpha with smooth curve
        $alpha = 0
        if ($brightness -gt 40) {
            $normalized = ($brightness - 40) / (255 - 40)
            if ($normalized -gt 1) { $normalized = 1 }
            $alpha = [int]($normalized * 255)
        }
        
        if ($alpha -gt 0) {
            $whiteColor = [System.Drawing.Color]::FromArgb($alpha, 255, 255, 255)
            $blueColor  = [System.Drawing.Color]::FromArgb($alpha, 37, 99, 235) # #2563EB
            
            for ($dy = 0; $dy -lt $scale; $dy++) {
                for ($dx = 0; $dx -lt $scale; $dx++) {
                    $whiteBmp.SetPixel($x * $scale + $dx, $y * $scale + $dy, $whiteColor)
                    $blueBmp.SetPixel($x * $scale + $dx, $y * $scale + $dy, $blueColor)
                }
            }
        }
    }
}

$whiteBmp.Save("a:\GBGCabs\assets\gbgx_official_white.png", [System.Drawing.Imaging.ImageFormat]::Png)
$blueBmp.Save("a:\GBGCabs\assets\gbgx_official_blue.png", [System.Drawing.Imaging.ImageFormat]::Png)
$whiteBmp.Save("a:\GBGCabs\public\gbgx_official_white.png", [System.Drawing.Imaging.ImageFormat]::Png)
$blueBmp.Save("a:\GBGCabs\public\gbgx_official_blue.png", [System.Drawing.Imaging.ImageFormat]::Png)

$whiteBmp.Dispose()
$blueBmp.Dispose()
$bmp.Dispose()

Write-Output "Successfully generated gbgx_official_white.png and gbgx_official_blue.png ($outW x $outH)"
