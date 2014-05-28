function CheckResolutionMobile() {
    var an = screen.width;
    var al = screen.height;
    var alto = $(window).height();
    var ancho = $(window).width();
    var alto_header = (60);
    var alto_footer = (65);
    var margenes = 15;
    alto_content = (alto - alto_header - alto_footer - (2 * margenes));
    $("#header_pedidos_emitidos").css('height', alto_header);
    $("#footer_comun").css('height', alto_footer);
    $('style').append('.k-grid tbody tr{height:48px; font-size:14px;} .k-grid-header { font-size:13px;} .ui-btn-text { font-size: 11px;}');
    localStorage.setItem('footer_btn_guardar_borrador', 'Guardar Borrador');
    localStorage.setItem('footer_btn_guardar_plantilla', 'Guardar Plantilla');

    if (al >= 1080) { //FULL HD
        if (alto >400){
            $('head').append('  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=medium-dpi" charset="utf-8"/>');
            var max_reg_pag = $(window).height(); //Maximo numero de registros por pagina
            $('style').append('.k-grid tbody tr{height:51px; font-size:14px;} .k-grid-header { font-size:13px;}');

            localStorage["max_row_per_pag"] = Math.floor(alto_content / 51);
            localStorage["pedidos_detalle_pag_max_row_min"] = Math.floor(alto_content / 51) -4;
            localStorage["pedidos_detalle_pag_max_row_max"] = Math.floor((alto_content / 51) - 1);
            console.log("Medidas disponibles: Alto " + alto + " \ Ancho" + ancho);
            console.log("Resolcuion disponibles: Alto " + al + " \ Ancho" + an);
            console.log("Paginas por pantalla" + localStorage["max_row_per_pag"]);
        }
        if (alto < 400) {
            console.log("NEXUS " + "alto " + al + "ancho " + an);
            var alto = $(window).height();
            $('head').append('  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=high-dpi" charset="utf-8"/>');
            $('style').append('.k-grid tbody tr{height:48px; font-size:14px;} .k-grid-header { font-size:13px;} .ui-btn-text { font-size: 11px;}');
            var max_reg_pag = $(window).height(); //Maximo numero de registros por pagina
            localStorage["max_row_per_pag"] = Math.floor(alto_content / 25);
            localStorage["pedidos_detalle_pag_max_row_min"] = Math.floor(alto_content / 25) -5;
            localStorage["pedidos_detalle_pag_max_row_max"] = Math.floor((alto_content / 25)-1);
            console.log("Paginas por pantalla" + localStorage["max_row_per_pag"]);
            // CORTAR TEXTOS
            if (localStorage['language']=="ES")
            {
                    console.log("Cortamos los botones " + localStorage.getItem('footer_btn_guardar_borrador'));
                    localStorage['footer_btn_guardar_borrador'] = 'Guardar Borr.';
                    localStorage['footer_btn_guardar_plantilla'] = 'Guardar Plant.';
            }
        }
    } else if (al >= 800) {
        console.log("GALAXY TAB 10 ");
        var alto = $(window).height();
        $('head').append('  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=medium-dpi" charset="utf-8"/>');
        var max_reg_pag = $(window).height(); //Maximo numero de registros por pagina
        $('style').append('.k-grid tbody tr{height:50px;}');
        localStorage["max_row_per_pag"] = Math.floor(alto_content / 50);
        localStorage["pedidos_detalle_pag_max_row_min"] = Math.floor(alto_content / 50) -4;
        localStorage["pedidos_detalle_pag_max_row_max"] = Math.floor((alto_content / 50) - 1); 
        console.log("Paginas por pantalla" + localStorage["max_row_per_pag"]);
    } else if (al >= 600) {
        console.log("Tablet despacho");
        var alto = $(window).height();
        $('head').append('  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=medium-dpi" charset="utf-8"/>');
        var max_reg_pag = $(window).height(); //Maximo numero de registros por pagina
        $('style').append('.k-grid tbody tr{height:50px;}');
        localStorage["max_row_per_pag"] = Math.floor(alto_content / 50);
        localStorage["pedidos_detalle_pag_max_row_min"] = Math.floor(alto_content / 50) -4;
        localStorage["pedidos_detalle_pag_max_row_max"] = Math.floor((alto_content / 50) - 1); 
        console.log("Paginas por pantalla" + localStorage["max_row_per_pag"]);
    } else if (al >= 480) {
        console.log("Galaxy S2");
        var alto = $(window).height();
        $('head').append('  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=high-dpi" charset="utf-8"/>');
        var max_reg_pag = $(window).height(); //Maximo numero de registros por pagina
        $('style').append('.k-grid tbody tr{height:50px;}');
        localStorage["max_row_per_pag"] = Math.floor(alto_content / 20) - 1;
        localStorage["pedidos_detalle_pag_max_row_min"] = Math.floor(alto_content / 20) -6;
        localStorage["pedidos_detalle_pag_max_row_max"] = Math.floor((alto_content / 20) - 2); 
        console.log("Paginas por pantalla" + localStorage["max_row_per_pag"]);
    } else {
        var alto = $(window).height();
        console.log("TABLET");
        $('head').append('  <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width, height=device-height, target-densitydpi=medium-dpi" charset="utf-8"/>');
        console.log("Resolucion " + alto);
        var max_reg_pag = $(window).height(); //Maximo numero de registros por pagina
        localStorage["max_row_per_pag"] = Math.floor(alto_content / 20) - 1; // tiene que ser 40
        localStorage["pedidos_detalle_pag_max_row_min"] = Math.floor(alto_content / 20) -4;
        localStorage["pedidos_detalle_pag_max_row_max"] = Math.floor((alto_content / 20) - 1); 
        console.log("Paginas por pantalla" + localStorage["max_row_per_pag"]);
    }
    console.log("ancho total mobil " + an);
	return 1;
}

function CheckResolutionPc() {
    localStorage.setItem('footer_btn_guardar_borrador', 'Guardar Borrador');
    localStorage.setItem('footer_btn_guardar_plantilla', 'Guardar Plantilla');
    var an = screen.width;
    var al = screen.height;
    var alto = $(window).height();
    var ancho = $(window).width();
    var alto_header = (60);
    var alto_footer = (65);
    var margenes = 15;
    alto_content = (alto - alto_header - alto_footer - (2 * margenes));
    $("#header_pedidos_emitidos").css('height', alto_header);
    $("#footer_comun").css('height', alto_footer);
    $('style').append('.k-grid tbody tr{height:50px;}');

    console.log("Ancho de la pantalla ancho " + an + "alto " + al);
    var alto = $(window).height();
    var max_reg_pag = $(window).height(); //Maximo numero de registros por pagina
    localStorage["max_row_per_pag"] = Math.floor(alto_content / 50);
    localStorage["pedidos_detalle_pag_max_row_min"] = Math.floor(alto_content / 50) -4 ;
    localStorage["pedidos_detalle_pag_max_row_max"] = Math.floor((alto_content / 50) -1 ); 

    console.log("Paginas por pantalla" + localStorage["max_row_per_pag"]);
}