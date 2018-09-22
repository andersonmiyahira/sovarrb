﻿using Application.ViewModel.Request;
using AutoMapper;
using Domain.Entities;
using System.Collections.Generic;

namespace Application.AutoMapper
{
    public class ViewModelToDomainProfile : Profile
    {
        public ViewModelToDomainProfile()
        {
            Banco();
            Segmento();
        }

        private void Arquivo()
        {
            //CreateMap<ImportarRequest, List<Arquivo>>()
            //        .ForMember(x => x.Add, opt => opt.MapFrom(src => src.));
        }

        private void Banco()
        {
            CreateMap<BancoRequest, Banco>();
        }

        private void Segmento()
        {
            CreateMap<SegmentoRequest, Segmento>();
        }
    }
}
