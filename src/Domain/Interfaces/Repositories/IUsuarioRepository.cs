﻿using Domain.Entities;

namespace Domain.Interfaces.Repositories
{
    public interface IUsuarioRepository : IRepositoryBase<Usuario>
    {
        Usuario VerificarLogin(Usuario entity);
    }
}
