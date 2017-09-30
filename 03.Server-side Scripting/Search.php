
<!DOCTYPE html>
<html>
<head>
    <META charset="UTF-8" />
<style>
    #searchArea{
        background-color: #F3F3F3;
        width: 700px;
        height: 155px;
        position: absolute;
        left: 300px;
        top: 20px;
        border: 1px solid #E3E3E3;
    }
    .areaTitle{
        font-size: 40px;
        position: absolute;
        left: 10px;
        text-align:center;
        width: 680px;
        border-bottom: 1px solid #C6C6C6;
    }
    .formPart{
        position: absolute;
        left: 20px;
        top:60px;
    }
   
    .imgclick{
        cursor: default;
    }

    .res{
        width: 750px;
        background-color: #F3F3F3;
        position: absolute;
        left: 270px;
        top: 220px;
        font-family: Helvetica;
        border-collapse: collapse;
        border: 1px solid #E3E3E3;
        text-align: left;
        
    }
    .res th,.res td{
        border: 1px solid #E3E3E3;
    }
    .resDetail{
        width: 750px;
        border: 0px solid white;
        position: absolute;
        left: 270px;
        top: 200px;
        font-family: Helvetica;
    }
    .DetailTile{
        background-color: #CCCCCC;
        text-align: center;
        font-family: Helvetica;
    }
    .NoDetail{
        background-color: #F3F3F3;
        text-align: center;
        font-family: Helvetica;
    }
    
    .albumcontent,.albumcontent td,.postmessages,.postmessages td{
        #display: none;
        margin-top: 30px;
        text-align: left;
        width: 750px;
        background-color: #FFFFFF;
        #position: absolute;
        #left: 270px;
        #top: 240px;
        border: 1px solid #E3E3E3;
        border-collapse: collapse;
    }
    .albumcontent img{
        #display: none;
        margin-right: 10px;
        
    }
    .clickword{
        color:blue; 
        text-decoration: underline;
        display:inline-block;

    }
    .clickword:hover{
        cursor: pointer;
        
    }
    
    
</style>
    <title>Facebook Search</title>
</head>

<body>
<script>
        function addLocation() {
            var x = document.getElementById("typeSelector").value;
            if (x != "place") {
                document.getElementById("placesInfo").style.visibility = "hidden";
            }
            else {
                document.getElementById("placesInfo").style.visibility = "";
            }
        }
    function Wordclick(elementName){
        
    
        if( elementName == "albumposition2"){
            document.getElementsByClassName("postposition2")[0].style.display = "none";
        }
        else if(elementName == "postposition2"){
             document.getElementsByClassName("albumposition2")[0].style.display = "none";
        }
        //a = document.getElementsByClassName('clickword');
        a = document.getElementsByClassName(elementName);
        a[0].style.display=(a[0].style.display=="none")?"":"none";
        
        
        /*if(a[0].style.display=="none"){
            a[0].style.display=="";
        }
        else{
            a[0].style.display=="none"
        }*/
        
        
    }
</script>

<?php
// Set session variables
//var_dump($_POST);
//var_dump($_GET);
//var_dump($_SESSION);

if (isset($_POST['submit'])){
//if ($_SERVER["REQUEST_METHOD"] == "POST"){
            
            $_POST['webpage'] = 1;
            
            //echo "<h1>1</h1><br>";  
        #echo $obj;
        }
    
else if(isset($_GET['id'])){
    $_POST["webpage"] = 2;
    $_POST["id"] = $_GET['id'];
    $_POST["keyword"] = $_GET['keyword'];
    $_POST["type"] = $_GET['type'];
    $_POST["location"] = $_GET['location'];
    $_POST["distance"] = $_GET['distance'];
    //echo "<h2>2</h2><br>";
}
else if(isset($_GET['imgLink'])){
    $_POST["webpage"] = 3;
    //echo $_GET['imgLink'];
    $_POST['img'] = urldecode($_GET['imgLink']);
   
    //echo "<h3>3</h3><br>";
}
//else{
//    $_POST["webpage"] = 0;
//    echo "<h4>4</h4><br>";
//    
//}

//echo '$_POST\'s imformation displays play as follow:<br>'; 
//unset($_POST['imgLink']);
//var_dump($_POST);

    

?>
    
    
<div id="searchArea">
    <div class="areaTitle" style="Times New Roman: Helvetica;"><i>Facebook Search</i></div>
    <div class="formPart">
        <form method="post" action="Search.php">
            <div>Keyword
                <input type="text" size="12" name="keyword" value="<?php echo $_POST['keyword']; ?>"  oninvalid="setCustomValidity('This cant be left empty')" oninput="setCustomValidity('')" required>
            </div>
            <div>Type
                <select id="typeSelector" name="type" onchange="addLocation()" style="margin-left:30px">
                    <option value="user" <?php if(isset($_POST[ 'type']) && $_POST[ 'type']=="user" ) echo "selected";?>>Users</option>
                    <option value="page" <?php if(isset($_POST[ 'type']) && $_POST[ 'type']=="page" ) echo "selected";?>>Pages</option>
                    <option value="event" <?php if(isset($_POST[ 'type']) && $_POST[ 'type']=="event" ) echo "selected";?>>Events</option>
                    <option value="place" <?php if(isset($_POST[ 'type']) && $_POST[ 'type']=="place" ) echo "selected";?>>Places</option>
                    <option value="group" <?php if(isset($_POST[ 'type']) && $_POST[ 'type']=="group" ) echo "selected";?>>Groups</option>
                </select>
            </div>
            <div id="placesInfo" <?php if($_POST[ 'type'] != "place" ) echo "style='visibility:hidden'";?> width = "20px">Location
                <input type="text" size="12" name="location" value="<?php echo $_POST['location']; ?>" width="20px"> Distance(meters)
                <input type="text" size="12" name="distance" value="<?php echo $_POST['distance']; ?>"> </div>
            <div style="padding-left:63px">
                <input type="submit" value="Search" name="submit">
                <input type="reset" value="Clear" name="clear" onclick = "window.location='Search.php'"> </div>
        </form>
    </div>
</div>
    
    
<?php 
    
    require_once __DIR__ . '/php-graph-sdk-5.0.0/src/Facebook/autoload.php'; 
    //$json = file_get_contents($query);
    //echo $json;
    //var_dump( $json);
    //$obj = json_decode($json);   
    $fb = new Facebook\Facebook([
    'app_id' => '780504348764511',
    'app_secret' => '924a8fd593c2c3154723f6a9c920afeb',
    'default_graph_version' => 'v2.8',
    ]);

    $fb->setDefaultAccessToken('EAALF3VR0KV8BAJxZA0VAaZAe8SiNlqaWnZCs5RNfq6AcB9Tm3lVcI3dcZCMC4sCqVioaPzUbp6o9hSH1dizldHgwseo3UKI9WjFPlqEixJ3ZCo6YWkMfiDY6zR5cC7CvXtgXAjohkFY0nzLdMxKId29ulOKZBGFkkZD');
    $access_token = "EAALF3VR0KV8BAJxZA0VAaZAe8SiNlqaWnZCs5RNfq6AcB9Tm3lVcI3dcZCMC4sCqVioaPzUbp6o9hSH1dizldHgwseo3UKI9WjFPlqEixJ3ZCo6YWkMfiDY6zR5cC7CvXtgXAjohkFY0nzLdMxKId29ulOKZBGFkkZD";
//    if($_POST["webpage"] == 0){
//        echo "<h1>1</h1><br>";
//    }
    
    if($_POST["webpage"] == 1){
            
            $keyword = $_POST['keyword'];
            $type = $_POST['type'];
            $location = $_POST['location'];
            $distance =$_POST['distance'];


            $access_token = "EAALF3VR0KV8BAJxZA0VAaZAe8SiNlqaWnZCs5RNfq6AcB9Tm3lVcI3dcZCMC4sCqVioaPzUbp6o9hSH1dizldHgwseo3UKI9WjFPlqEixJ3ZCo6YWkMfiDY6zR5cC7CvXtgXAjohkFY0nzLdMxKId29ulOKZBGFkkZD";
        
            $QueryError = 0;
            if( $type != 'place' && $type != 'event'){
                if(preg_match('/^[0-9]*$/',$keyword) && $type == 'user'){
                    $QueryError = 3;
                }
                else
                {
                
                $query = "/search?q=".$keyword."&type=".$type."&fields=id,name,picture.width(700).height(700)";
                }
                //$json = file_get_contents($query);
                //$obj = json_decode($json);
            }
            else if($type === "event"){
                $query = "/search?q=".$keyword."&type=".$type."&fields=id,name,picture.width(700).height(700),place";
            }
            
            else if( $type === "place"){
                
                if($location!=""){
                
                $my_api_key = "AIzaSyAFcY1WTKmP8MKhCFHOVZvxfhAxO-TkCKw";
                $location = urlencode(trim($location));
                //echo $location."<br>";
                $locationReq = "https://maps.googleapis.com/maps/api/geocode/json?address=".$location."&key=".$my_api_key;
                //echo $locationReq."<br>";
                $locationJson = file_get_contents($locationReq);
                $locationObj = json_decode($locationJson);
                //var_dump($locationObj->results[0]->geometry);
                //var_dump($locationObj->results);
                //var_dump(count($locationObj->results));
                $a = count($locationObj->results);
                //echo $a;
                //$a = 0;
                if($a > 0){
                    $latitude = $locationObj->results[0]->geometry->location->lat;
                    $longitude = $locationObj->results[0]->geometry->location->lng;
                    //$centerLocaton = $latitude.",".$longitude;
                    //echo $lat."<br>";
                    //echo $lng."<br>";
                    if($distance!=""){
                        $query = "/search?q=".$keyword."&type=".$type."&center=".$latitude.",".$longitude."&distance=".$distance."&fields=id,name,picture.width(700).height(700)";
                    }
                    else if($distance==""){
                        $query = "/search?q=".$keyword."&type=".$type."&center=".$latitude.",".$longitude."&fields=id,name,picture.width(700).height(700)";
                    }
                }
                else{
                    $QueryError = 2;
                }
                }
                
                
                else if($location==""&&$distance!=""){
                    $QueryError = 1;
                }
                else{
                    $query = "/search?q=".$keyword."&type=".$type."&fields=id,name,picture.width(700).height(700)";
                }

            }
            //echo $query;
           
            if($QueryError == 0){

                $request = $fb->request('GET',$query);

                try {
                  $response = $fb->getClient()->sendRequest($request);
                  //var_dump($response);
                } catch(Facebook\Exceptions\FacebookResponseException $e) {
                  echo 'Graph returned an error: ' . $e->getMessage();
                    exit;
                } catch(Facebook\Exceptions\FacebookSDKException $e) {
                  echo 'Facebook SDK returned an error: ' . $e->getMessage();
                    exit;
                }

                $obj = $response->getDecodedBody();
                //var_dump($obj);
                $arrlength = count($obj['data']);

                if($arrlength && $type != 'event'){
                echo "<table class='res' id = 'res' ><tr><th>Profile Photo</th><th>Name</th><th>Details</th></tr>";

                    for($i = 0;$i<$arrlength;$i++){
                        echo "<tr>";

                        $imgaddr = $obj['data'][$i]['picture']['data']['url'];
                        //var_dump($obj['data'][$i]['picture']);
                        $imgurl = urlencode($imgaddr);
                        //echo $imgaddr."<br>";
                        //echo "ENCODE:".$imgurl."<br>";

                        //$_POST['imgLink'] = $imgaddr;
                        //echo $imgaddr."<br>";
                        //$img_arr=array('img'=>$imgaddr);
                        //$img_json = json_encode($img_arr);
                        //var_dump($img_json);
                       //"<href = 'Search.php?imgLink=".$imgaddr."'"

                        //echo "<td><a href='".$imgaddr."'><img src='".$imgaddr."'height='30' width='40'></a></td>";
                        echo "<td><a class = 'imgclick' href='Search.php?imgLink=".$imgurl."' target='_blank' ><img src='".$imgaddr."'height='30' width='40'></a></td>";
                        echo "<td>".$obj['data'][$i]['name']."</td>";

                        //echo "<td><a href='https://graph.facebook.com/v2.8/".$obj['data'][$i]['id']."? fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5)&access_token=".$access_token."'>Details</a></td>";
                        //$_POST['webpage'] = 2;
                        //$_POST['id'] = $obj['data'][$i]['id'];
                        echo "<td><a href='Search.php?id=".$obj['data'][$i]['id']."&keyword=$keyword&type=$type&location=$location&distance=$distance'>Details</a></td>";

                        echo "</tr>";
                    }
                echo "</table>";
                }
                else if($arrlength){
                    echo "<table class='res' id = 'res' ><tr><th>Profile Photo</th><th>Name</th><th>Place</th></tr>";

                    for($i = 0;$i<$arrlength;$i++){
                        echo "<tr>";
                        $imgaddr = $obj['data'][$i]['picture']['data']['url'];
                        $imgurl = urlencode($imgaddr);
                        echo "<td><a class = 'imgclick' href='Search.php?imgLink=".$imgurl."' target='_blank' ><img src='".$imgaddr."'height='30' width='40'></a></td>";
                        echo "<td>".$obj['data'][$i]['name']."</td>";
                        echo "<td>".$obj['data'][$i]['place']['name']."</td>";
                        echo "</tr>";
                    }
                echo "</table>";
                }
                else{
                    echo "<table class='res' id = 'res' style='text-align:center;'><td>No Records has been found</td></tr></table>";

                }
            }
            else if($QueryError == 1){
                echo "<table class='res' id = 'res' style='text-align:center;'><td>Distance Specified without location or address</td></tr></table>";
            }
            else if($QueryError == 2){
                echo "<table class='res' id = 'res' style='text-align:center;'><td>Address is invalid</td></tr></table>";
            }
            else if($QueryError == 3){
                echo "<table class='res' id = 'res' style='text-align:center;'><td>Keyword is invalid for user type</td></tr></table>";
            }
    }
    else if($_POST["webpage"] == 2){
        //echo $_POST["id"];
        //unset($_POST['id']);
        
        
        $query = "/".$_POST["id"]."?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5)";
        //echo $query."<br>";
        $request = $fb->request('GET',$query);

            try {
              $response = $fb->getClient()->sendRequest($request);
              //var_dump($response);
            } catch(Facebook\Exceptions\FacebookResponseException $e) {
              echo 'Graph returned an error: ' . $e->getMessage();
                exit;
            } catch(Facebook\Exceptions\FacebookSDKException $e) {
              echo 'Facebook SDK returned an error: ' . $e->getMessage();
                exit;
            }

            $obj = $response->getDecodedBody();
            //var_dump($obj);
            
            echo "<table class='resDetail' id = 'res'>";
            
            $arrlength = count($obj['albums']['data']);
            
            if($arrlength){
                echo "<tr class = 'DetailTile'><td style='text-align:center;'><div class='clickword' onclick=Wordclick('albumposition2')>Albums</div></td></tr>";
                
                echo "<tr><td style='display:none;' class= 'albumposition2'><table class='albumcontent'>";
                for($i = 0;$i<$arrlength;$i++){
                    
                    if($obj['albums']['data'][$i]['photos']){
                    echo "<tr><td><div class='clickword' onclick=Wordclick('HiddenTarget".$i."')>".$obj['albums']['data'][$i]['name']."</div></td></tr>";
                    //var_dump($obj['albums']);
                    //$photosnum = count($obj['albums']['data'][$i]['photos']);
                    echo "<tr style='display:none;' class='HiddenTarget".$i."'><td>";
                    for($j=0;$j<2;$j++){
                    
                    $imgid = $obj['albums']['data'][$i]['photos']['data'][$j]['id'];
                    if($imgid){
                    $querypic = "https://graph.facebook.com/v2.8/".$imgid."/picture?access_token=".$access_token;
                    //echo $querypic."<br>";
                    //echo $imgaddr."<br>";
                    echo "<a class = 'imgclick' href='Search.php?imgLink=".$querypic."' target='_blank'><img src='".$querypic."'height='80' width='80'></a>";
                    }
                    }}
                    else{
                        echo "<tr><td><div class='nonclickword'>".$obj['albums']['data'][$i]['name']."</div></td></tr>";
                    }
                    echo "</td></tr>";
                }
                echo "</table>";
                
            }
            else{
                echo "<tr><td class= 'NoDetail'>No Albums has been found</td></tr>";
            }
            echo "</td></tr>";
            echo "<tr heigh = '20px'><td>&nbsp;</td></tr>";
            $postslength = count($obj['posts']['data']);
            //var_dump($obj['posts']);
            if($postslength){
                echo "<tr class = 'DetailTile'><td style='text-align:center;'><div class='clickword' onclick=Wordclick('postposition2')>Posts</td></tr>";
                echo "<tr><td style='display:none;' class= 'postposition2'><table class='postmessages'><tr><th>Message</th></tr>";
                for($i = 0;$i<$postslength;$i++){
                    
                    echo "<tr><td>".$obj['posts']['data'][$i]['message']."</td></tr>";
                    
                }
                echo "</table></td></tr>";
            }
            else{
                echo "<tr><td class= 'NoDetail'>No Posts has been found</td></tr>";
            }
            echo "</table>";
        
    }
    else if($_POST["webpage"] == 3){
         
         echo "<script>document.getElementById('searchArea').style.display='none';</script>";
         //echo $_POST['img'];
         echo "<img src='".$_POST['img']."'>";
    }
    
    
    ?>
<noscript>    
</body>
</html>