
    // Load the Google Maps JavaScript API
(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})
    ({key: mapKey, v: "weekly"}); 


// Initialize and add the map
let map;

async function initMap() {
  // Request needed libraries.
  //@ts-ignore
  let position = { lat: coordinates[1], lng: coordinates[0] };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 9,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title:coordinateLocation,
  })  

  let infowindow = new google.maps.InfoWindow({
    content: `
    <div  style="">
      <h4>${coordinateLocation}</h4>
      <p>Exact location provided after booking</p>
    </div>
  `,
    backgroundColor: "yellow",
  });

  marker.addListener('gmp-click', function() {
    infowindow.open(map, marker);
  });
  map.addListener('click', function() {
    infowindow.close(map, marker);
  });
}

initMap();


