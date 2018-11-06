$location ='C:\Users\tran_\Projects\'


Write-Host "-------------------------------------" 
Write-Host "Please choose [earthquake, spaceship]" 

$app = Read-Host -Prompt 'Input your app name'
$Date = Get-Date
Write-Host "You input app '$app' on '$Date'" 

function checkNameisRational($a){
   $apps= @('earthquake','spaceship')
   if ($a -in $apps)
    {
        Write-Host "'$a' is rational'"
        return 1
    }else{
        return 0
    }
}

function run(){
    $isAppNameCorrent = checkNameisRational $app
    if($app -and $isAppNameCorrent){
        $path = $location + 'reactivePrograming.training\exercies\' + $app + '\index.html'
        Write-Host "Openning $app app!..."
        Start-Process 'chrome' $path
    }else{
        #default
        $path = $location + 'reactivePrograming.training\exercies\'+ 'earthquake' + '\index.html'
        Write-Host "Openning earthquake app!..."
        Start-Process 'chrome' $path
    }
}

run
Write-Host "-------------------------------------" 
