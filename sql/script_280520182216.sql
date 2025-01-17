USE [SOVARRBDB]
GO
/****** Object:  Table [dbo].[Arquivo]    Script Date: 28/05/2018 22:16:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Arquivo](
	[IdArquivo] [int] IDENTITY(1,1) NOT NULL,
	[NomeArquivoOriginal] [varchar](255) NOT NULL,
	[NomeArquivoGerado] [varchar](255) NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[IdBanco] [int] NOT NULL,
	[IdTipoCNAB] [int] NOT NULL,
	[EhValido] [bit] NOT NULL,
	[DataCadastro] [datetime] NOT NULL,
	[DataAlteracao] [datetime] NOT NULL,
 CONSTRAINT [PK_Arquivo] PRIMARY KEY CLUSTERED 
(
	[IdArquivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Banco]    Script Date: 28/05/2018 22:16:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Banco](
	[IdBanco] [int] NOT NULL,
	[Descricao] [varchar](255) NULL,
 CONSTRAINT [PK_Banco] PRIMARY KEY CLUSTERED 
(
	[IdBanco] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[LogArquivo]    Script Date: 28/05/2018 22:16:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[LogArquivo](
	[IdLogArquivo] [int] NOT NULL,
	[IdArquivo] [int] NOT NULL,
	[Linha] [int] NOT NULL,
	[PosicaoDe] [int] NOT NULL,
	[PosicaoAte] [int] NOT NULL,
	[EhValido] [bit] NOT NULL,
	[Mensagem] [varchar](1000) NULL,
	[IdParametro] [int] NOT NULL,
 CONSTRAINT [PK_LogArquivo] PRIMARY KEY CLUSTERED 
(
	[IdLogArquivo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoBoleto]    Script Date: 28/05/2018 22:16:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoBoleto](
	[IdTipoBoleto] [int] NOT NULL,
	[Descricao] [varchar](255) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoCNAB]    Script Date: 28/05/2018 22:16:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoCNAB](
	[IdTipoCNAB] [int] NOT NULL,
	[Descricao] [varchar](255) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TipoParametro]    Script Date: 28/05/2018 22:16:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoParametro](
	[IdTipoParametro] [int] NOT NULL,
	[Descricao] [varchar](255) NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 28/05/2018 22:16:42 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](255) NOT NULL,
	[Email] [varchar](400) NOT NULL,
	[Senha] [varchar](1000) NOT NULL,
	[EhAdministrador] [bit] NOT NULL,
	[DataCadastro] [datetime] NOT NULL,
	[DataAlteracao] [datetime] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Arquivo]  WITH CHECK ADD  CONSTRAINT [FK_Arquivo_Banco] FOREIGN KEY([IdBanco])
REFERENCES [dbo].[Banco] ([IdBanco])
GO
ALTER TABLE [dbo].[Arquivo] CHECK CONSTRAINT [FK_Arquivo_Banco]
GO
ALTER TABLE [dbo].[Arquivo]  WITH CHECK ADD  CONSTRAINT [FK_Arquivo_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[Arquivo] CHECK CONSTRAINT [FK_Arquivo_Usuario]
GO
ALTER TABLE [dbo].[LogArquivo]  WITH CHECK ADD  CONSTRAINT [FK_LogArquivo_Arquivo] FOREIGN KEY([IdArquivo])
REFERENCES [dbo].[Arquivo] ([IdArquivo])
GO
ALTER TABLE [dbo].[LogArquivo] CHECK CONSTRAINT [FK_LogArquivo_Arquivo]
GO
USE [master]
GO
ALTER DATABASE [SOVARRBDB] SET  READ_WRITE 
GO
