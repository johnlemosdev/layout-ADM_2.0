$(document).ready(function () {

  $('#menu').click(function () {
    $('#popup-menu').toggleClass('ativo');
  });

  $('#icone-perfil').click(function () {
    $('#popup-perfil').toggleClass('ativo');
  });

  
  $('.acordion-header').click(function(){
    $('.acordion-content').toggleClass('open')
  });


// (1) Adiciona botão de fechar às abas existentes (uma vez ao carregar)
$('.abas-container .container li').each(function () {
  if (!$(this).find('.fechar-aba').length) {
    $(this).append('<span class="fechar-aba">×</span>');
  }
});

$('.abas-container').on('click', '.fechar-aba', function (e) {
  e.stopPropagation(); // Impede que o clique selecione a aba

  const $abaFechada = $(this).closest('li');
  const abaRel = $abaFechada.attr('rel');
  const isSelecionada = $abaFechada.hasClass('selecionada');

// Esconde o conteúdo da aba
  $('#' + abaRel).hide().removeClass('active');

    // Remove a aba da barra
  $abaFechada.remove();

  
  // Se a aba fechada era a selecionada
  if (isSelecionada) {
    let $abaAnterior = $abaFechada.prev('.aberta').first(); // procura anterior aberta

    if ($abaAnterior.length === 0) {
      // Se não tem anterior, pega a primeira aba aberta restante
      $abaAnterior = $('.abas-container .container li.aberta').last();
    }

    if ($abaAnterior.length > 0) {
      // Ativa essa aba
      $abaAnterior.addClass('selecionada');

      const relAnterior = $abaAnterior.attr('rel');
      $('#' + relAnterior).show().addClass('active');
    }else {
      // Se não houver mais nenhuma aba aberta, esconde tudo
      $('.conteudo').hide().removeClass('active');
    }
  }
  
});

  

    
    //Ativa uma aba (se já existe ou foi recém-criada)
    function ativarAba(abaRel, nomeAba = null) {
      const $container = $('.abas-container');
      const $listaAbas = $container.find('.container');

        // Procurar aba pela referência
        let $aba = $listaAbas.find('li[rel="' + abaRel + '"]');
    
        //Se a aba ainda não existe, criamos ela
        if ($aba.length === 0 && nomeAba) {
          $aba = $('<li>')
          .addClass('abas')
          .attr('rel', abaRel)
          .html(nomeAba + '<span class="fechar-aba">×</span>');;        
        $listaAbas.append($aba);
        }
    
        //Marca a aba como 'selecionada', sem esconder as outras
        $listaAbas.find('li').removeClass('selecionada');
        $aba.addClass('selecionada');

        // Se não tiver sido aberta antes, marca como 'aberta' para ficar visível
        if (!$aba.hasClass('aberta')) {
          $aba.addClass('aberta');
  }
    
        //Troca o conteúdo visível (somente 1 por vez)
        $('.conteudo').removeClass('active').hide();
        $('#' + abaRel).fadeIn(0).addClass('active');
    }
  
      // Clique na barra de abas
      $('.abas-container').on('click', '.container li', function () {
        const abaRel = $(this).attr('rel');
        ativarAba(abaRel);
      });
  

    // Clicar no menu lateral para ativar ou criar uma aba
    $('.menu__item-link').on('click', function (e) {
      e.preventDefault();
  
      const tab = $(this).data('tab');        // Ex: "inicio"
      const abaRel = 'aba-' + tab;            // Ex: "aba-inicio"
      const nomeAba = tab.charAt(0).toUpperCase() + tab.slice(1); // Capitaliza
      
      ativarAba(abaRel, nomeAba);
    });





    

  
 
  


});


 
  
  