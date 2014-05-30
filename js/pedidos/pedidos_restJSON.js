function pCargarParcialPedidos() {

	if (localStorage['online']==1 ) {

        localStorage['pModoCargaParcial']="PO";
        localStorage['cargaError']=0;

        createTemporalTables("PO");


        console.log("MODO CARGA PARCIAL 1111111 "+localStorage['pModoCargaParcial']);
        $('#pCargaDatos').html('<img src="./images/loading.gif"> ');
        restAllOrdersJSON();
    }

}

function pCargarParcialPlantillas() {

	if (localStorage['online']==1 ) {

        localStorage['pModoCargaParcial']="PP";
        localStorage['cargaError']=0;

        createTemporalTables("PP");


        console.log("MODO CARGA PARCIAL 1111111 "+localStorage['pModoCargaParcial']);
        $('#pCargaDatos').html('<img src="./images/loading.gif"> ');
        restAllTemplatesJSON();
    }



}


function createTemporalTables(bloque) {
	
	if (bloque=="PO" || bloque=="") {
		
	 
  	 	
	  db.transaction (function (transaction) 
	  {

	  /*
	  	var q = "ALTER TABLE orders RENAME TO orders";
	  	var q0 = "ALTER TABLE ordersDetail RENAME TO back_ordersDetail";
	  */
	    var c1 = "CREATE TABLE IF NOT EXISTS orders_tmp " +
	        "(idOrder INTEGER NOT NULL PRIMARY KEY , " +
	        "idVendor INT NOT NULL, " + 
	        "idPurchaseCenter INT NOT NULL, " + 
	        "idDeliveryZone VARCHAR(5), " + 
	        "reference VARCHAR(15), " + 
					"status TINYINT NOT NULL, " + 
					"deliveryDate DATE, " + 
	        "documentDate DATE, " + 
	        "amount DECIMAL(10,3) DEFAULT 0, " + 
	        "currency VARCHAR(5) DEFAULT '' , " +
	        "number INT NOT NULL, " +
	        "sourceId VARCHAR(1), " +  
	        "type VARCHAR(1), " +
	        "observaciones VARCHAR(150) DEFAULT '' )";


	        
  	  var c2 =" CREATE TABLE IF NOT EXISTS ordersDetail_tmp ( " +
							" idOrder INT NOT NULL, "+
							" lineNumber SMALLINT NOT NULL, " + 
        " idItem INT NOT NULL, " +
				" itemName VARCHAR(150) NOT NULL, " +
				" itemStatus VARCHAR(1) NOT NULL, " +
				" quantity DECIMAL (10,3)  NOT NULL, "+
				" firstSizeId INT  DEFAULT 0, " + 
				" secondSizeId INT  DEFAULT 0, "+
				" unitType SMALLINT , "+
				" ordinalType SMALLINT , "+
				" idLogisticsChain VARCHAR(10) NOT NULL, " +
				" logisticsChainName VARCHAR(150) NOT NULL, " +
				" logisticsChainStatus VARCHAR(1) NOT NULL)";
	  	



	  	var f_ini=nowBD().substr(0,10);

        var f_fin="";
        var n_meses_short=1;

        var a=f_ini.substr(0,4);
        var m=parseInt( f_ini.substr(5,2) ) - n_meses_short;
        var d=f_ini.substr(8,2);

        if ( m < 0 ) {
            m= (  12 + m );
            a=parseInt(a) - 1;
        }

        if (m < 10 ) m="0"+m;

        f_fin=a+"-"+m+"-"+d;

        console.log(c1);

	  	transaction.executeSql (c1, undefined, function (transaction) {
	  		var i1 = "INSERT OR IGNORE INTO orders_tmp SELECT * FROM orders WHERE documentDate < '"+f_fin+"'";
            //console.log(i1);
	  		transaction.executeSql (i1, undefined, function () { });

	  	});

        console.log(c2);
	  	transaction.executeSql (c2, undefined, function (transaction) {

	  	    var i2 ="INSERT OR IGNORE INTO ordersDetail_tmp SELECT d.* FROM orders as o , ordersDetail as d WHERE o.idOrder=d.idOrder AND documentDate < '"+f_fin+"'";
            //console.log(i2);
	  		transaction.executeSql (i2, undefined, function () { })
	  	});
	  

	    
	  });
	}


	if (bloque=="PP" || bloque=="") {



    	  db.transaction (function (transaction)
    	  {

    	  /*
    	  	var q = "ALTER TABLE orders RENAME TO orders";
    	  	var q0 = "ALTER TABLE ordersDetail RENAME TO back_ordersDetail";
    	  */
    	    var c1 = " CREATE TABLE IF NOT EXISTS ordersTemplates_tmp " +
                    "(idTemplate INTEGER NOT NULL PRIMARY KEY , " +
                    "idVendor INT NOT NULL, " +
                    "idPurchaseCenter INT NOT NULL, " +
                    "idDeliveryZone VARCHAR(5), " +
                    "reference VARCHAR(15), " +
                    "documentDate DATE, " +
                    "amount DECIMAL(10,3) DEFAULT 0, " +
                    "currency VARCHAR(5) DEFAULT '' , " +
                    "number INT NOT NULL, " +
                    "sourceId VARCHAR(1), " +
                    "type VARCHAR(1), " +
                    "status INT, " +
                    "name VARCHAR(150) DEFAULT '' )";


      	  var c2 ="  CREATE TABLE IF NOT EXISTS ordersTemplatesDetail_tmp " +
                            "( idTemplate INT NOT NULL, " +
                           " lineNumber SMALLINT NOT NULL, " +
                            " idItem INT NOT NULL, " +
                    				" itemName VARCHAR(150) NOT NULL, " +
                    				" itemStatus VARCHAR(1) NOT NULL, " +
                    				" quantity DECIMAL (10,3)  NOT NULL, "+
                    				" firstSizeId INT  DEFAULT 0, " +
                    				" secondSizeId INT  DEFAULT 0, "+
                    				" unitType SMALLINT , "+
                    				" ordinalType SMALLINT , "+
                    				" idLogisticsChain VARCHAR(10) NOT NULL, " +
                    				" logisticsChainName VARCHAR(150) NOT NULL, " +
                    				" logisticsChainStatus VARCHAR(1) NOT NULL)";




    	  	var f_ini=nowBD().substr(0,10);

            var f_fin="";
            var n_meses_short=1;

            var a=f_ini.substr(0,4);
            var m=parseInt( f_ini.substr(5,2) ) - n_meses_short;
            var d=f_ini.substr(8,2);

            if ( m < 0 ) {
                m= (  12 + m );
                a=parseInt(a) - 1;
            }

            if (m < 10 ) m="0"+m;

            f_fin=a+"-"+m+"-"+d;

            console.log(c1);

    	  	transaction.executeSql (c1, undefined, function (transaction) {  	});

            console.log(c2);
    	  	transaction.executeSql (c2, undefined, function (transaction) {	  	});



    	  });
    	}
}








function pFinalizarCargaParcial(){
	

	console.log("FINAL CARGAR");
	var q = [ ];
	var q1 = [ ];
	var i=0;


	if (localStorage['cargaError']=="0") {
		
		//TODO OK!!!!


        //CARGA PARCIAL PEDIDOS---------------------------------------------------------------------------------
		if (localStorage['pModoCargaParcial']=="PO") {
			

         db.transaction (function (transaction)
         {

         console.log("FINAL CARGAR 11111111");

			 var q = "DROP TABLE orders";

			transaction.executeSql (q, undefined, function (transaction) {
                 var q1 =  "ALTER TABLE orders_tmp RENAME TO orders";


                transaction.executeSql (q1, undefined, function () { });

            });


            var q0 = "DROP TABLE ordersDetail";
            transaction.executeSql (q0, undefined, function (transaction) {

                var q2 ="ALTER TABLE ordersDetail_tmp RENAME TO ordersDetail";
                transaction.executeSql (q2, undefined, function () { });
            });


		  });
		  
		  
		  //transaction.executeSql (qa1, [],  function (tx) { }, errorAqui ),1500);
		  
			localStorage['pModoCargaParcial']="";
			
			//console.log("AQUI!!!!!!!!!!!!!!!");
			
			if (localStorage['pantalla']=="emitidos") { setTimeout(pMostrarPedidos(),500); }
			
			setTimeout( $('#pCargaDatos').html('<img src="./images/btn_refresh.png">') , 500 );
			
			setTimeout( localStorage['pModoCargaParcial']="", 700 );
			
			
		}
		//CARGA PARCIAL PLANTILLAS---------------------------------------------------------------------------------
		else if (localStorage['pModoCargaParcial']=="PP") {


                   db.transaction (function (transaction)
                   {

                   console.log("FINAL CARGAR 11111111");

          			 var q = "DROP TABLE ordersTemplates";

          			transaction.executeSql (q, undefined, function (transaction) {
                           var q1 =  "ALTER TABLE ordersTemplates_tmp RENAME TO ordersTemplates";


                          transaction.executeSql (q1, undefined, function () { });

                      });


                      var q0 = "DROP TABLE ordersTemplatesDetail";
                      transaction.executeSql (q0, undefined, function (transaction) {

                          var q2 ="ALTER TABLE ordersTemplatesDetail_tmp RENAME TO ordersTemplatesDetail";
                          transaction.executeSql (q2, undefined, function () { });
                      });


          		  });

                    localStorage['pModoCargaParcial']="";

                    pRefrescarPantallaActual();

                    setTimeout( $('#pCargaDatos').html('<img src="./images/btn_refresh.png">') , 500 );

                    setTimeout( localStorage['pModoCargaParcial']="", 700 );


          		}

	} else {
		console.log("error en la carga parcial");

		if (localStorage['pModoCargaParcial']=="PO") {


            q.push("DROP TABLE orders_tmp ");
            q.push("DROP TABLE ordersDetail_tmp ");
            localStorage['pModoCargaParcial']="";

            var qa;
              db.transaction (function (transaction)
              {
                for (i=0; i < q.length; i++) {

                        qa=q[i];
                        console.log(qa);
                        setTimeout(transaction.executeSql (qa, [],  function (tx) { }, errorAqui ),200);
                }


              });
         } if (localStorage['pModoCargaParcial']=="PP") {

           		q.push("DROP TABLE ordersTemplates_tmp ");
                q.push("DROP TABLE ordersTemplatesDetail_tmp ");

                localStorage['pModoCargaParcial']="";

                var qa;
                  db.transaction (function (transaction)
                  {
                    for (i=0; i < q.length; i++) {

                            qa=q[i];
                            console.log(qa);
                            setTimeout(transaction.executeSql (qa, [],  function (tx) { }, errorAqui ),200);
                    }


                  });
         }
		//dropTemporalTables(localStorage['pModoCargaParcial']);
	}

	
}