using API.Models;
Console.Clear();

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

    var produtos = new List<Produto>
            {
                new Produto { Nome = "Laptop Gamer Dell G15", Quantidade = 15, Preco = 7500.00 },
                new Produto { Nome = "Mouse sem Fio Logitech MX Master 3", Quantidade = 120, Preco = 550.50 },
                new Produto { Nome = "Teclado Mecânico Redragon Kumara", Quantidade = 80, Preco = 289.75 },
                new Produto { Nome = "Monitor 4K LG 27 polegadas", Quantidade = 45, Preco = 2200.00 },
                new Produto { Nome = "Headset HyperX Cloud II", Quantidade = 95, Preco = 499.90 },
                new Produto { Nome = "SSD NVMe Kingston 1TB", Quantidade = 200, Preco = 650.00 },
                new Produto { Nome = "Cadeira Gamer DT3 Sports", Quantidade = 60, Preco = 1300.45 },
                new Produto { Nome = "Placa de Vídeo NVIDIA RTX 4070", Quantidade = 25, Preco = 4800.00 },
                new Produto { Nome = "Webcam Logitech C920 Full HD", Quantidade = 150, Preco = 350.00 },
                new Produto { Nome = "Microfone Blue Yeti USB", Quantidade = 70, Preco = 899.80 }
            };

app.MapGet("/", () => "API de produtos em C#");

app.MapGet("/api/produto/listar", () =>
{
    if (produtos.Any())
    {
        return Results.Ok(produtos);
    }
    return Results.NotFound("Lista vazia");
});


app.MapGet("/api/produto/buscar/{nome_do_produto}", (string nome_do_produto) =>
{
    // foreach (Produto produtoCadastrado in produtos)
    // {
    //     if (produtoCadastrado.Nome == nome_do_produto)
    //     {
    //         return Results.Ok(produto);
    //     }
    // }
    Produto? resultado = produtos.FirstOrDefault(x => x.Nome == nome_do_produto);
    if (resultado is null)
    {
        return Results.NotFound("Produto não localizado");
    }
    return Results.Ok(resultado);
});

app.MapPost("/api/produto/cadastrar", (Produto produto) =>
{
    foreach (Produto produtoCadastrado in produtos)
    {
        if (produtoCadastrado.Nome == produto.Nome)
    {
        return Results.Conflict("Já existe um produto com este nome.");
    }
    }
    produtos.Add(produto);
    return Results.Created();
});

app.Run();


