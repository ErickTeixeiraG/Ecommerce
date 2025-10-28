using API.Models;
using Microsoft.AspNetCore.Mvc;
Console.Clear();

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();
builder.Services.AddCors(
    options => options.AddPolicy("Acesso total",
    configs => configs.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod())
);
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

app.MapGet("/api/produto/listar", ([FromServices] AppDataContext ctx) =>
{
    
    if (ctx.Produtos.Any())
    {
        return Results.Ok(ctx.Produtos.ToList());
    }
    return Results.NotFound("Lista vazia");
});


app.MapDelete("/api/produto/deletar/{id}", ([FromRoute]string id, [FromServices] AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Produto não localizado");
    }
    ctx.Produtos.Remove(resultado);
    ctx.SaveChanges();
    return Results.Ok(resultado);
});

app.MapPatch("/api/produto/alterar/{id}", ([FromRoute]string id, [FromBody]Produto produtoAtualizado, [FromServices] AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.Find(id);
    if (resultado is null)
    {
        return Results.NotFound("Produto não encontrado para alteração.");
    }
    resultado.Nome = produtoAtualizado.Nome;
    resultado.Quantidade = produtoAtualizado.Quantidade;
    resultado.Preco = produtoAtualizado.Preco;
    ctx.SaveChanges();
    return Results.Ok(resultado);
});

app.MapGet("/api/produto/buscar/{nome_do_produto}", (string nome_do_produto, [FromServices] AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.FirstOrDefault(x => x.Nome == nome_do_produto);
    if (resultado is null)
    {
        return Results.NotFound("Produto não localizado");
    }
    return Results.Ok(resultado);
});

app.MapPost("/api/produto/cadastrar", ([FromBody]Produto produto, [FromServices] AppDataContext ctx) =>
{
    Produto? resultado = ctx.Produtos.FirstOrDefault(x => x.Nome == produto.Nome);
    if (resultado is null)
    {
        ctx.Produtos.Add(produto);
        ctx.SaveChanges();
        return Results.Created("", produto);
    }
    return Results.Conflict("Esse produto já foi cadastrado");
});

app.UseCors("Acesso total");
app.Run();


