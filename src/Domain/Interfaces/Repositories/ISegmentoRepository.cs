﻿using Domain.Entities;

namespace Domain.Interfaces.Repositories
{
    public interface ISegmentoRepository : IRepositoryBase<Segmento>
    {
        Segmento ObterPorCodigo(int id);
    }
}
