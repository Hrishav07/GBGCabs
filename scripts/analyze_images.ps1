Add-Type -AssemblyName System.Drawing

function Find-TextBounds($path, $label) {
    $bmp = [System.Drawing.Bitmap]::FromFile($path)
    $w = $bmp.Width
    $h = $bmp.Height
    
    $minX_white = 9999; $maxX_white = 0; $minY_white = 9999; $maxY_white = 0
    $minX_orange = 9999; $maxX_orange = 0; $minY_orange = 9999; $maxY_orange = 0
    $minX_bar = 9999; $maxX_bar = 0; $minY_bar = 9999; $maxY_bar = 0
    
    for ($y = [Math]::Max(0, $h - 150); $y -lt $h; $y++) {
        for ($x = 10; $x -lt [Math]::Min($w, 450); $x++) {
            $col = $bmp.GetPixel($x, $y)
            $r = $col.R; $g = $col.G; $b = $col.B
            
            # White text
            if ($r -gt 210 -and $g -gt 210 -and $b -gt 210) {
                if ($x -lt $minX_white) { $minX_white = $x }
                if ($x -gt $maxX_white) { $maxX_white = $x }
                if ($y -lt $minY_white) { $minY_white = $y }
                if ($y -gt $maxY_white) { $maxY_white = $y }
            }
            
            # Orange text / bar
            if ($r -gt 170 -and $g -gt 60 -and $g -lt 160 -and $b -lt 60) {
                if ($y -lt ($h - 90)) {
                    # likely the orange bar
                    if ($x -lt $minX_bar) { $minX_bar = $x }
                    if ($x -gt $maxX_bar) { $maxX_bar = $x }
                    if ($y -lt $minY_bar) { $minY_bar = $y }
                    if ($y -gt $maxY_bar) { $maxY_bar = $y }
                } else {
                    # likely orange title
                    if ($x -lt $minX_orange) { $minX_orange = $x }
                    if ($x -gt $maxX_orange) { $maxX_orange = $x }
                    if ($y -lt $minY_orange) { $minY_orange = $y }
                    if ($y -gt $maxY_orange) { $maxY_orange = $y }
                }
            }
        }
    }
    
    Write-Output "=== $label ($w x $h) ==="
    Write-Output "Bar: X: $minX_bar to $maxX_bar, Y: $minY_bar to $maxY_bar"
    Write-Output "White: X: $minX_white to $maxX_white, Y: $minY_white to $maxY_white"
    Write-Output "Orange: X: $minX_orange to $maxX_orange, Y: $minY_orange to $maxY_orange"
    
    $bmp.Dispose()
}

Find-TextBounds "a:\GBGCabs\public\team\akash_ali.png" "Akash Ali"
Find-TextBounds "a:\GBGCabs\public\team\vijaya_shrivastava.png" "Vijaya Shrivastava"
Find-TextBounds "a:\GBGCabs\public\team\suryansh_raj_pandey.png" "Suryansh Raj Pandey"
