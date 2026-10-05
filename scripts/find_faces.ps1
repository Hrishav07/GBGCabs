Add-Type -AssemblyName System.Drawing

function Measure-Face($srcPath, $label) {
    $src = [System.Drawing.Bitmap]::FromFile($srcPath)
    Write-Output "=== Measuring $label ($($src.Width) x $($src.Height)) ==="
    
    # We can detect skin-tone pixels in the upper half of the image
    # Skin tone in RGB typically: R > 120, G between 80-180, B between 60-150, R > G and G > B
    $skinPixelsX = @()
    $skinPixelsY = @()
    
    for ($y = 40; $y -lt 300; $y += 2) {
        for ($x = 50; $x -lt ($src.Width - 50); $x += 2) {
            $c = $src.GetPixel($x, $y)
            $r = $c.R; $g = $c.G; $b = $c.B
            
            # Simple skin detector
            if ($r -gt 100 -and $g -gt 60 -and $b -gt 40 -and $r -gt $g -and $g -ge $b -and ($r - $b) -gt 15) {
                # exclude very bright white/yellow
                if (($r + $g + $b) -lt 680) {
                    $skinPixelsX += $x
                    $skinPixelsY += $y
                }
            }
        }
    }
    
    if ($skinPixelsX.Count -gt 0) {
        # Sort and get median / percentiles
        $sortedX = $skinPixelsX | Sort-Object
        $sortedY = $skinPixelsY | Sort-Object
        
        $p10X = $sortedX[[int]($sortedX.Count * 0.1)]
        $p90X = $sortedX[[int]($sortedX.Count * 0.9)]
        $medX = $sortedX[[int]($sortedX.Count * 0.5)]
        
        $p10Y = $sortedY[[int]($sortedY.Count * 0.1)]
        $p90Y = $sortedY[[int]($sortedY.Count * 0.9)]
        $medY = $sortedY[[int]($sortedY.Count * 0.5)]
        
        Write-Output "Skin X: 10%=$p10X, 90%=$p90X, Median Center X=$medX (Face width approx: $($p90X - $p10X))"
        Write-Output "Skin Y: 10%=$p10Y, 90%=$p90Y, Median Center Y=$medY (Face height approx: $($p90Y - $p10Y))"
    }
    
    $src.Dispose()
}

$userDir = "C:\Users\hrish\.gemini\antigravity-ide\brain\91a0e407-dd25-4507-94bc-46aa9f336b2e\.user_uploaded"

Measure-Face "$userDir\media_1791179665605.png" "Akash Ali"
Measure-Face "$userDir\media_1791179665551.png" "Vijaya Shrivastava"
Measure-Face "$userDir\media_1791179665504.png" "Suryansh Raj Pandey"
