-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 06-Dez-2023 às 14:25
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `hotel`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `entradas`
--

CREATE TABLE `entradas` (
  `registro` int(11) NOT NULL,
  `data` varchar(12) NOT NULL,
  `horaEntrada` varchar(6) NOT NULL,
  `horaSaida` varchar(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `entradas`
--

INSERT INTO `entradas` (`registro`, `data`, `horaEntrada`, `horaSaida`) VALUES
(33, '2023-11-11', '10:56', '12:55'),
(39, '2023-12-05', '19:55', '20:55');

-- --------------------------------------------------------

--
-- Estrutura da tabela `hosps`
--

CREATE TABLE `hosps` (
  `codHospede` int(11) NOT NULL,
  `codEntrada` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `hosps`
--

INSERT INTO `hosps` (`codHospede`, `codEntrada`) VALUES
(1, 33),
(27, 39);

-- --------------------------------------------------------

--
-- Estrutura da tabela `newhospedes`
--

CREATE TABLE `newhospedes` (
  `nome` varchar(50) NOT NULL,
  `endereco` varchar(100) NOT NULL,
  `cpf` varchar(15) NOT NULL,
  `fone` varchar(20) NOT NULL,
  `codigo` int(11) NOT NULL,
  `dataCadastro` varchar(12) NOT NULL,
  `codTelefone` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `newhospedes`
--

INSERT INTO `newhospedes` (`nome`, `endereco`, `cpf`, `fone`, `codigo`, `dataCadastro`, `codTelefone`) VALUES
('jose', 'rua 8', '111.111.111-11', '(11) 11111-1111', 20, '2023-11-10', 1),
('marcelo', 'rua 8', '262.435.424-22', '(12) 12421-3212', 26, '2023-11-17', 1),
('mauro', 'Av. w.luis', '454.575.757-54', '(54) 54578-5757', 33, '2023-12-07', 20);

-- --------------------------------------------------------

--
-- Estrutura da tabela `telefones`
--

CREATE TABLE `telefones` (
  `codigoTel` int(11) NOT NULL,
  `descricao` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `telefones`
--

INSERT INTO `telefones` (`codigoTel`, `descricao`) VALUES
(20, '00-99999-0000'),
(34, '18-99999-9999');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `entradas`
--
ALTER TABLE `entradas`
  ADD PRIMARY KEY (`registro`);

--
-- Índices para tabela `hosps`
--
ALTER TABLE `hosps`
  ADD PRIMARY KEY (`codHospede`,`codEntrada`),
  ADD KEY `fk_codigoEntrada` (`codEntrada`);

--
-- Índices para tabela `newhospedes`
--
ALTER TABLE `newhospedes`
  ADD PRIMARY KEY (`codigo`),
  ADD KEY `fk_telefone` (`codTelefone`);

--
-- Índices para tabela `telefones`
--
ALTER TABLE `telefones`
  ADD PRIMARY KEY (`codigoTel`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `entradas`
--
ALTER TABLE `entradas`
  MODIFY `registro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- AUTO_INCREMENT de tabela `newhospedes`
--
ALTER TABLE `newhospedes`
  MODIFY `codigo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de tabela `telefones`
--
ALTER TABLE `telefones`
  MODIFY `codigoTel` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
