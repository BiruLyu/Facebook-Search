
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
    

    
    if(!empty($_GET['keyword'])){
        $keyword = $_GET['keyword'];
    }

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

    $query = "/search?q=".$keyword."&type=page&fields=id,name,picture.width(700).height(700)";
    $request = $fb->request('GET',$query);
    $response = $fb->getClient()->sendRequest($request);
    $obj = $response->getDecodedBody();
    $result->pages=$obj;

    $query = "/search?q=".$keyword."&type=event&fields=id,name,picture.width(700).height(700)";
    $request = $fb->request('GET',$query);
    $response = $fb->getClient()->sendRequest($request);
    $obj = $response->getDecodedBody();
    $result->events=$obj;

    $query = "/search?q=".$keyword."&type=place&fields=id,name,picture.width(700).height(700)";
    $request = $fb->request('GET',$query);
    $response = $fb->getClient()->sendRequest($request);
    $obj = $response->getDecodedBody();
    $result->places=$obj;

    $query = "/search?q=".$keyword."&type=group&fields=id,name,picture.width(700).height(700)";    
    $request = $fb->request('GET',$query);
    $response = $fb->getClient()->sendRequest($request);
    $obj = $response->getDecodedBody();
    $result->groups=$obj;
    
    //var_dump($obj);
    echo json_encode($result);


    ?>
