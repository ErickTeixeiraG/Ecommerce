namespace API.Models;

public class Produto
{
    // //atributos ou propriedades
    public Produto()
    {
        CriadoEm = DateTime.Now;
        Id = Guid.NewGuid().ToString();
    }
    public string Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public int Quantidade { get; set; }
    public double Preco { get; set; }
    public DateTime CriadoEm { get; set; }

   
}
