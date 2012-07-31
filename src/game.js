window.onload = function() {
        
    var version = null,
    	today = new Date();
	
	// Fix for cache
    if(gameContainer.env == 'dev') {
		version = today.getDay()+"_"+ today.getHours() +"_"+today.getSeconds();
	} else {
		version = gameContainer.gameVersion;
	};
    
	// 800px de largura e 600px de altura
	Crafty.init(800, 600);
	// Cria o elemento canvas
	Crafty.canvas.init();
	// Define o plano de fundo do stage
	//Crafty.background("url('web/images/bg.png')");
	
	// Realiza a requisição destes arquivos.
	// Ao terminar de carregá-los executa a função definida
	require([
	         "src/sprites.js?v="+version+"",
	         "src/config.js?v="+version+"",
	], function() {
		// Cria os sprites (tiles)
		var sprites = new Sprites();
		sprites.create();

		// Carrega as configurações globais do jogo
		gameContainer['conf'] = new Config({});
		
		//loading screen - é exibida enquanto os assets são carregados
		Crafty.scene("loading", function() {
            // limpa cenas e elementos de interface
            sc = []; infc = [];   

			var loadingText = Crafty.e("2D, DOM, Text")
					.attr({w: 500, h: 20, x: ((Crafty.viewport.width) / 2), y: (Crafty.viewport.height / 2), z: 2})
					.text('Carregando...')
					.css({fontFamily: 'Impact', fontSize: '12px', color: '#FFF'});
		
			// Criando a lista de assets com as imagens
			var assets = sprites.getPaths();
			
			// A função load recebe uma array de assets e uma função callback executada ao completar o carregamento
			Crafty.load(assets, function() {
				// array with local components
                var elements = [
                    "src/components/MouseHover.js?v="+version+"",
                    "src/components/Tweener.js?v="+version+"",
                    "src/entities/base/BaseEntity.js?v="+version+"",
	    		];

    			//quando todos os arquivos estiverem carregados, executa a cena 'start'
    			require(elements, function() {	   
    				loadingText.destroy();
    				if (gameContainer.scene != undefined) {
    					Crafty.scene(gameContainer.scene);
    				}
    			});
    		},
			function(e) {
				loadingText.text('Carregando ('+(e.percent.toFixed(0))+'%)');
			});
		}); // fecha a definição da cena 'loading'
		
		// Faz o carregamento de todos os arquivos que descrevem as cenas
		var scenes = [
			"src/scenes/main.js?v="+version+""
		];
		
		require(scenes, function(){});
		
		//Executa a cena loading
		Crafty.scene("loading");
	});
};