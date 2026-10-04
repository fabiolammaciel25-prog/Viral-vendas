const http = require("http");
const crypto = require("crypto");

const PORT = process.env.PORT || 10000;

const SHOPEE_APP_ID = process.env.SHOPEE_APP_ID;
const SHOPEE_SECRET = process.env.SHOPEE_SECRET;

const SHOPEE_API =
  "https://open-api.affiliate.shopee.com.br/graphql";

function gerarAssinatura(payload) {
  return crypto
    .createHash("sha256")
    .update(SHOPEE_APP_ID + payload + SHOPEE_SECRET)
    .digest("hex");
}

const server = http.createServer((req, res) => {

  res.writeHead(200, {
    "Content-Type": "application/json; charset=utf-8"
  });

  res.end(JSON.stringify({
    status: "online",
    aplicativo: "Viral Vendas Automático",
    shopeeConfigurada:
      Boolean(SHOPEE_APP_ID && SHOPEE_SECRET)
  }));

});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
