﻿using System;

namespace Application.ViewModel.Request
{
    public class Banco
    {
        public int Id { get; set; }
        public string Descricao { get; set; }
        public DateTime DataCadastro { get; set; }
        public bool Ativo { get; set; }
    }
}
