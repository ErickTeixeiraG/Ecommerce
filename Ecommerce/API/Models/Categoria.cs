using System;

namespace API.Models;

public class Categoria
{
    public int CategoriaId { get; set; }
    public string Nome { get; set; } = string.Empty;
    public DateTime CriadoEm { get; set; } = DateTime.Now;
}
