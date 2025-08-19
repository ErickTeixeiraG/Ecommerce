var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", () => "Minha segunda API em C#");

app.MapGet("/endereco", () => "toma te endereço então");
app.MapPost("/endereco", () => "toma teu post então");


app.Run();
