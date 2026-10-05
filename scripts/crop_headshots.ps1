Add-Type -AssemblyName System.Drawing

function Generate-Clean-Executive-Headshot($srcPath, $outPath, $cropX, $cropY, $cropSize) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    
    $targetSize = 600
    $bmp = New-Object System.Drawing.Bitmap($targetSize, $targetSize, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    $imgAttr = New-Object System.Drawing.Imaging.ImageAttributes
    $c = 1.05
    $b = 0.02
    $matrix = New-Object 'float[][]' 5, 5
    $matrix[0] = [float[]]@($c, 0, 0, 0, 0)
    $matrix[1] = [float[]]@(0, $c, 0, 0, 0)
    $matrix[2] = [float[]]@(0, 0, $c, 0, 0)
    $matrix[3] = [float[]]@(0, 0, 0, 1, 0)
    $matrix[4] = [float[]]@($b, $b, $b, 0, 1)
    $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix(,$matrix)
    $imgAttr.SetColorMatrix($colorMatrix)
    
    $destRect = New-Object System.Drawing.Rectangle(0, 0, $targetSize, $targetSize)
    $g.DrawImage($src, $destRect, $cropX, $cropY, $cropSize, $cropSize, [System.Drawing.GraphicsUnit]::Pixel, $imgAttr)
    
    $g.Dispose()
    $src.Dispose()
    
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Saved: $outPath"
}

$userDir = "C:\Users\hrish\.gemini\antigravity-ide\brain\91a0e407-dd25-4507-94bc-46aa9f336b2e\.user_uploaded"

# Vijaya with cropX = 240
Generate-Clean-Executive-Headshot "$userDir\media_1791179665551.png" "a:\GBGCabs\public\team\vijaya_headshot.png" 240 15 370
Copy-Item "a:\GBGCabs\public\team\vijaya_headshot.png" "a:\GBGCabs\assets\team\vijaya_headshot.png" -Force
