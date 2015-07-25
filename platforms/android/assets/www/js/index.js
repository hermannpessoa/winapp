var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        document.addEventListener("deviceready", onDeviceReady, false);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown';
    states[Connection.ETHERNET] = 'conected';
    states[Connection.WIFI]     = 'conected';
    states[Connection.CELL_2G]  = 'conected';
    states[Connection.CELL_3G]  = 'conected';
    states[Connection.CELL_4G]  = 'conected';
    states[Connection.CELL]     = 'conected';
    states[Connection.NONE]     = 'disconected';

    if(states[networkState] == 'disconected'){
        // alert('Connection type: ' + states[networkState]);
        conectado = 0;
    }else{
        // alert('CONECATO, Foda-se em qual tipo =]');
        conectado = 1;
    }
}


function expirationDate() {
    expire = new Date();
    expireTimestamp = expire.setDate(expire.getDate() + 30).toString()
    expireTimestamp = expireTimestamp.substr(0, (expireTimestamp.length - 3)) // data que expira o login

    return expireTimestamp;
}

function onDeviceReady() {
    checkConnection();
    logged = localStorage.getItem('logged');

    if (conectado == 0) {

        now = new Date()
        atualTimestamp = now.setDate(now.getDate()).toString()
        atualTimestamp = atualTimestamp.substr(0, (atualTimestamp.length - 3)) // data atual

        if (atualTimestamp > localStorage.getItem('expires')) {
            alert("Você precisa se conectar para sincronizar seus dados com o servidor");
            if (document.URL.indexOf('youwin') > -1) {
                // window.location = "index.html"; // return false; 
            }
        } else {
            if (localStorage.getItem('status') == 1) {
                window.location = "#youwin";
                $('.loadd').fadeOut('fast');
            } else if (logged == 1) {
                alert("Sem Permissão, entre em contato com o RH da sua empresa para verificar...");
            }
        }
    } else {
        // alert('conectado')
        // alert(localStorage.getItem('status'))
        // alert(logged)

        if (localStorage.getItem('status') == 1 && logged == 1) {

            //atualizando cadastro
            $('.loadd').fadeIn('fast');
            $.ajax({
                url: "http://winbeneficios.com/public/json.php?u=" + localStorage.getItem('email') + "|" + localStorage.getItem('hash'),
            }).done(function(data) {
                if (data == "login error") {
                    alert('erro ao efetuar o login');
                } else {
                    var d = $.parseJSON(data);
                    if (d.status == 0 && logged == 1) {
                        alert("Você precisa se conectar para sincronizar seus dados com o servidor");
                        localStorage.setItem('logged', 0);
                        if (document.URL.indexOf('youwin') > -1) {
                            window.location = "index.html"; // return false; 
                        }


                        // alert("Sem Permissão, entre em contato com o RH da sua empresa para verificar...")
                    } else {
                        localStorage.setItem('status', d.status);
                        localStorage.setItem('expires', expirationDate());
                        $('.loadd').fadeOut('fast');
                    }
                }
            })

            window.location = "#youwin";

        } else {
            if (document.URL.indexOf('youwin') > -1) {
                window.location = "index.html"; // return false; 
            }
        }
    }
}

function createHash(pass) {
    hash = CryptoJS.MD5(CryptoJS.MD5(pass.trim()
                .toLowerCase())
            .toString()
            .substr(0, 3))
        .toString()
        .substr(0, 6);

    return hash;

}
