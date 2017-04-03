
<?php 
    
    
    //var_dump($_GET);
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
    

//    $_GET['url'] = 'https://graph.facebook.com/v2.8/search?fields=id,name,picture.width%28700%29.height%28700%29&type=user&q=usc&access_token=EAALF3VR0KV8BAJxZA0VAaZAe8SiNlqaWnZCs5RNfq6AcB9Tm3lVcI3dcZCMC4sCqVioaPzUbp6o9hSH1dizldHgwseo3UKI9WjFPlqEixJ3ZCo6YWkMfiDY6zR5cC7CvXtgXAjohkFY0nzLdMxKId29ulOKZBGFkkZD&limit=25&offset=25&__after_id=enc_AdCdUbK4GxNay9Bth35CrmaW1M246St2uCy9BEcJrcxmKsg1UnXGKGBwTyZCZBvDCphjyg5bJ1y01sBmfN0LZAcJclC';

    if(!empty($_GET['url'])){
        $query = $_GET['url'];
        
        //$result = new stdClass();
        $jsonFile = file_get_contents($query);
        //$doc = json_decode($jsonFile);
        //$result = $doc;
        //echo json_encode($result);
        echo $jsonFile;
    }

    if(!empty($_GET['keyword'])){
        $keyword = $_GET['keyword'];
    
        
        //echo $keyword;
        
        $result = new stdClass();
        $result->users= new stdClass();
        $result->pages= new stdClass();
        $result->events= new stdClass();
        $result->places= new stdClass();
        $result->groups= new stdClass();
        $result->favorites= new stdClass();

        //var_dump($result);
        $query = "/search?q=".$keyword."&type=user&fields=id,name,picture.width(700).height(700)";

        $request = $fb->request('GET',$query);
        $response = $fb->getClient()->sendRequest($request);
        $obj = $response->getDecodedBody();
        $result->users=$obj;
        //var_dump($result->users);
        
        $query = "/search?q=".$keyword."&type=page&fields=id,name,picture.width(700).height(700)";
        $request = $fb->request('GET',$query);
        $response = $fb->getClient()->sendRequest($request);
        $obj = $response->getDecodedBody();
        $result->pages=$obj;
        //var_dump($result->pages);
        
        $query = "/search?q=".$keyword."&type=event&fields=id,name,picture.width(700).height(700)";
        $request = $fb->request('GET',$query);
        $response = $fb->getClient()->sendRequest($request);
        $obj = $response->getDecodedBody();
        $result->events=$obj;
        //var_dump($result->events);
        
        if(empty($_GET['latitude']) || empty($_GET['longitude']))
        {
            $query = "/search?q=".$keyword."&type=place&fields=id,name,picture.width(700).height(700)";
        } else {
            $query = "/search?q=".$keyword."&type=place&center=".$_GET['latitude'].",".$_GET['longitude']."&fields=id,name,picture.width(700).height(700)";
        }
        
        $request = $fb->request('GET',$query);
        $response = $fb->getClient()->sendRequest($request);
        $obj = $response->getDecodedBody();
        $result->places=$obj;
        //var_dump($result->places);
        
        
        $query = "/search?q=".$keyword."&type=group&fields=id,name,picture.width(700).height(700)";    
        $request = $fb->request('GET',$query);
        $response = $fb->getClient()->sendRequest($request);
        $obj = $response->getDecodedBody();
        $result->groups=$obj;

        //var_dump($obj);
        echo json_encode($result);
        //echo $keyword;
    }

    if(!empty($_GET['id'])){
        $id = $_GET['id'];
        $result = new stdClass();
        

        //var_dump($result);
        
        $query = "/".$id."?fields=id,name,picture.width(700).height(700),albums.limit(5){name,photos.limit(2){name, picture}},posts.limit(5)";

        $request = $fb->request('GET',$query);
        $response = $fb->getClient()->sendRequest($request);
        $obj = $response->getDecodedBody();
        $result = $obj;

        //var_dump($obj);
        echo json_encode($result);
    }

    





    ?>
