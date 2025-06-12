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

    
    //Ativa uma aba (se já existe ou foi recém-criada)
    function ativarAba(abaRel, nomeAba = null) {
      const $container = $('.abas-container');
      const $listaAbas = $container.find('.container');
  
        // Procurar aba pela referência
        let $aba = $listaAbas.find('li[rel="' + abaRel + '"]');
    
        //Se a aba ainda não existe, criamos ela
        if ($aba.length === 0 && nomeAba) {
          $aba = $('<li>')
            .addClass('.abas .aberta')
            .attr('rel', abaRel)
            .text(`${nomeAba} <button class="fechar-aba" title="Fechar aba">x</button>`);
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

    // Evento de clique no botão de fechar aba
$('.abas-container .container').on('click', '.fechar-aba', function (e) {
  e.stopPropagation(); // Evita ativar a aba ao clicar no "X"

  const $aba = $(this).closest('li');
  const rel = $aba.attr('rel');

  const isSelecionada = $aba.hasClass('selecionada');

  // Remove a aba da navbar
  $aba.remove();

  // Esconde o conteúdo da aba
  $('#' + rel).removeClass('active').hide();

  // Se a aba fechada era a selecionada, ativa a anterior ou a última aba aberta
  if (isSelecionada) {
    const $ultimasAbertas = $('.abas.aberta');
    if ($ultimasAbertas.length) {
      const $ultima = $ultimasAbertas.last();
      const novoRel = $ultima.attr('rel');
      ativarAba(novoRel);
    }
  }
});

  
 
  


});


 
  
  