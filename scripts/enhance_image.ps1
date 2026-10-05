Add-Type -AssemblyName System.Drawing

function Enhance-TeamPhoto($srcPath, $outPath, $name, $role, $targetW, $targetH) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    
    $bmp = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $g = [System.Drawing.Graphics]::FromImage($bmp)
    
    $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
    $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
    $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
    $g.TextRenderingHint = [System.Drawing.Text.TextRenderingHint]::ClearTypeGridFit
    
    # 1. Background fill
    $g.Clear([System.Drawing.Color]::FromArgb(255, 12, 16, 26))
    
    # 2. Draw source image scaled to fill
    # Calculate scale to cover
    $scale = [Math]::Max($targetW / $src.Width, $targetH / $src.Height)
    $drawW = [int]($src.Width * $scale)
    $drawH = [int]($src.Height * $scale)
    $drawX = [int](($targetW - $drawW) / 2)
    $drawY = 0 # Top aligned
    
    # Enhance sharpness, vibrance, and contrast of the photo
    $imgAttr = New-Object System.Drawing.Imaging.ImageAttributes
    $c = 1.06 # Contrast
    $b = 0.02 # Brightness
    $matrix = New-Object 'float[][]' 5, 5
    $matrix[0] = [float[]]@($c, 0, 0, 0, 0)
    $matrix[1] = [float[]]@(0, $c, 0, 0, 0)
    $matrix[2] = [float[]]@(0, 0, $c, 0, 0)
    $matrix[3] = [float[]]@(0, 0, 0, 1, 0)
    $matrix[4] = [float[]]@($b, $b, $b, 0, 1)
    $colorMatrix = New-Object System.Drawing.Imaging.ColorMatrix(,$matrix)
    $imgAttr.SetColorMatrix($colorMatrix)
    
    $destRect = New-Object System.Drawing.Rectangle($drawX, $drawY, $drawW, $drawH)
    $g.DrawImage($src, $destRect, 0, 0, $src.Width, $src.Height, [System.Drawing.GraphicsUnit]::Pixel, $imgAttr)
    
    # 3. Cleanly cover the old text area (from Y = 74% to 100%)
    # Use a smooth vertical gradient across the entire lower portion for natural cinematic lighting
    $gradStartY = [int]($targetH * 0.68)
    $gradHeight = $targetH - $gradStartY
    
    $vBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, $gradStartY)),
        (New-Object System.Drawing.Point(0, $targetH)),
        [System.Drawing.Color]::FromArgb(0, 8, 12, 20),
        [System.Drawing.Color]::FromArgb(240, 8, 12, 20)
    )
    $g.FillRectangle($vBrush, 0, $gradStartY, $targetW, $gradHeight)
    $vBrush.Dispose()
    
    # Extra bottom strip to ensure old text is 100% invisible
    $solidStripY = [int]($targetH * 0.82)
    $solidBrush = New-Object System.Drawing.Drawing2D.LinearGradientBrush(
        (New-Object System.Drawing.Point(0, $solidStripY)),
        (New-Object System.Drawing.Point(0, $targetH)),
        [System.Drawing.Color]::FromArgb(200, 8, 12, 20),
        [System.Drawing.Color]::FromArgb(250, 8, 12, 20)
    )
    $g.FillRectangle($solidBrush, 0, $solidStripY, [int]($targetW * 0.7), $targetH - $solidStripY)
    $solidBrush.Dispose()

    # 4. Draw Crisp New Typography
    $startX = 46
    
    # A. Orange accent line
    $barY = [int]($targetH * 0.77)
    $barW = 64
    $barH = 6
    $barBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 239, 108, 30)) # #EF6C1E GoBabyGo Orange
    $g.FillRectangle($barBrush, $startX, $barY, $barW, $barH)
    $barBrush.Dispose()
    
    # B. Name in bold crisp pure white with subtle depth shadow
    $nameFont = New-Object System.Drawing.Font("Arial", 30, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $nameY = $barY + 14
    
    # Shadow for maximum readability
    $shadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(230, 0, 0, 0))
    $g.DrawString($name, $nameFont, $shadowBrush, [float]($startX + 2), [float]($nameY + 2))
    $shadowBrush.Dispose()
    
    # Crisp white text
    $whiteBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 255, 255))
    $g.DrawString($name, $nameFont, $whiteBrush, [float]$startX, [float]$nameY)
    $whiteBrush.Dispose()
    
    # C. Role/Title in bright, high-contrast, luminous electric orange
    # Tracking/letter-spacing: add spaces between letters for luxury editorial styling
    $roleSpaced = ""
    for ($i = 0; $i -lt $role.Length; $i++) {
        $roleSpaced += $role.Substring($i, 1) + " "
    }
    $roleSpaced = $roleSpaced.Trim().ToUpper()
    
    $roleFont = New-Object System.Drawing.Font("Arial", 14, [System.Drawing.FontStyle]::Bold, [System.Drawing.GraphicsUnit]::Pixel)
    $roleY = $nameY + 44
    
    # Role shadow
    $roleShadowBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(220, 0, 0, 0))
    $g.DrawString($roleSpaced, $roleFont, $roleShadowBrush, [float]($startX + 1.5), [float]($roleY + 1.5))
    $roleShadowBrush.Dispose()
    
    # Bright glowing orange
    $roleOrangeBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 255, 140, 40)) # #FF8C28
    $g.DrawString($roleSpaced, $roleFont, $roleOrangeBrush, [float]$startX, [float]$roleY)
    $roleOrangeBrush.Dispose()
    
    $g.Dispose()
    $src.Dispose()
    
    $bmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
    Write-Output "Enhanced: $outPath"
}

Enhance-TeamPhoto "a:\GBGCabs\public\team\akash_ali.png" "a:\GBGCabs\public\team\test_akash2.png" "Akash Ali" "CEO & FOUNDER" 980 700
Enhance-TeamPhoto "a:\GBGCabs\public\team\vijaya_shrivastava.png" "a:\GBGCabs\public\team\test_vijaya2.png" "Vijaya Shrivastava" "CHIEF OF STAFF" 980 700
Enhance-TeamPhoto "a:\GBGCabs\public\team\suryansh_raj_pandey.png" "a:\GBGCabs\public\team\test_suryansh2.png" "Suryansh Raj Pandey" "HEAD OF MARKETING" 980 700
