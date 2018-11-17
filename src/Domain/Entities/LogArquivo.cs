﻿using Domain.Extensions;
using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;

namespace Domain.Entities
{
    //Entity
    public partial class LogArquivo
    {
        public LogArquivo()
        {

        }

        public LogArquivo(int arquivoId, int linha, int posicaoDe, int posicaoAte, bool ehValido, DateTime dataCadastro, string mensagem, int tipoParametroId)
        {   
            ArquivoId = arquivoId;
            Linha = linha;
            PosicaoDe = posicaoDe;
            PosicaoAte = posicaoAte;
            EhValido = ehValido;
            DataCadastro = dataCadastro;
            Mensagem = mensagem;
            TipoParametroId = tipoParametroId;
        }

        public int IdLogArquivo { get; private set; }
        public int ArquivoId { get; private set; }
        public int LayoutId { get; private set; }
        public int Linha { get; private set; }
        public int PosicaoDe { get; private set; }
        public int PosicaoAte { get; private set; }
        public bool EhValido { get; private set; }
        public DateTime DataCadastro { get; private set; }
        public string Mensagem { get; private set; }
        public int TipoParametroId { get; set; }

        public Arquivo Arquivo { get; private set; }

        public Layout Layout { get; private set; }

        public void SetarEhValido(bool ehValido)
        {
            EhValido = ehValido;
        }

        public void SetarMensagem(string mensagem)
        {
            Mensagem = mensagem;
        }

        public void SetarLayout(Layout layout)
        {
            Layout = layout;
        }
    }

    //Filter
    public partial class LogArquivo
    {
        [NotMapped]
        public bool? EhValidoFilter { get; private set; }
    }

    //Response
    public partial class LogArquivo
    {
        [NotMapped]
        public int Tipo
        {
            get
            {
                return Layout.TipoRegistroId;
            }
        }

        [NotMapped]
        public string MensagemFormatada
        {
            get
            {
                var valoresEsperados = Layout.ETipoCampo.GetDescription();
                if(Layout.LayoutValoresEsperados.Any())
                    valoresEsperados = string.Join(",", Layout.LayoutValoresEsperados.Select(_ => _.ValorEsperado.Descricao));

                if (EhValido)
                    return $"Linha {Linha} - OK";
                return $"Linha {Linha}, Posição {PosicaoDe} - Posição {PosicaoAte}, Esperado {valoresEsperados} - Encontrado: {Mensagem}";
            }
        }
    }
}
