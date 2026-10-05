Add-Type -AssemblyName System.Drawing

function Clean-And-Enhance-Photo($inputPath, $outPath1, $outPath2, $cropBottomPx) {
    $src = [System.Drawing.Bitmap]::FromFile($inputPath)
    
    $srcW = $src.Width
    $srcH = $src.Height - $cropBottomPx
    
    $targetW = 1000
    $targetH = 714 # 1.4:1 aspect ratio
    
    $bmp = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    
    # 1. Fill background with sleek dark slate
    $darkColor = [System.Drawing.Color]::FromArgb(255, 11, 15, 25)
    $g.Clear($darkColor)
    
    # 2. Draw source image scaled to cover top
    $scale = [Math]::Max($targetW / $srcW, $targetH / $srcH)
    $drawW = [int]($srcW * $scale)
    $drawH = [int]($srcH * $scale)
    $drawX = [int](($targetW - $drawW) / 2)
    $drawY = 0 # keep top aligned so heads/faces are perfectly positioned
    
    # Color matrix for slight contrast and clarity boost
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
    
    $destRect = New-Object System.Drawing.Rectangle($drawX, $drawY, $drawW, $drawH)
    $g.DrawImage($src, $destRect, 0, 0, $srcW, $srcH, [System.Drawing.GraphicsUnit]::Pixel, $imgAttr)
    
    # 3. Apply smooth natural dark gradient across the bottom portion
    # Starts at 62% and becomes completely solid by 75%
    # This completely erases all old text, orange lines, and artifacts seamlessly
    $gradStartY = [int]($targetH * 0.62)
    $solidStartY = [int]($targetH * 0.75)
    
    # Smooth gradient zone
    $gradBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, $gradStartY)),
        (New-Object System.Drawing.Point(0, $solidStartY)),
        [System.Drawing.Color]::FromArgb(0, 11, 15, 25),
        $darkColor
    )
    $g.FillRectangle($gradBrush, 0, $gradStartY, $targetW, $solidStartY - $gradStartY)
    $gradBrush.Dispose()
    
    # Solid bottom zone
    $solidBrush = New-Object System.Drawing.SolidBrush($darkColor)
    $g.FillRectangle($solidBrush, 0, $solidStartY, $targetW, $targetH - $solidStartY)
    $solidBrush.Dispose()
    
    $g.Dispose()
    $src.Dispose()
    
    # Save to both public and assets directories
    $bmp.Save($outPath1, [System.Drawing.Imaging.ImageFormat]::Png)
    if ($outPath2) {
        $bmp.Save($outPath2, [System.Drawing.Imaging.ImageFormat]::Png)
    }
    $bmp.Dispose()
    Write-Output "Cleaned and enhanced: $outPath1"
}

$userDir = "C:\Users\hrish\.gemini\antigravity-ide\brain\91a0e407-dd25-4507-94bc-46aa9f336b2e\.user_uploaded"

Clean-And-Enhance-Photo "$userDir\media_1791179665605.png" "a:\GBGCabs\public\team\akash_ali.png" "a:\GBGCabs\assets\team\akash_ali.png" 0
Clean-And-Enhance-Photo "$userDir\media_1791179665551.png" "a:\GBGCabs\public\team\vijaya_shrivastava.png" "a:\GBGCabs\assets\team\vijaya_shrivastava.png" 41
Clean-And-Enhance-Photo "$userDir\media_1791179665504.png" "a:\GBGCabs\public\team\suryansh_raj_pandey.png" "a:\GBGCabs\assets\team\suryansh_raj_pandey.png" 0
