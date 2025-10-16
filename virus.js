import axios from 'axios';

const auth = "eyJhbGciOiJIUzI1NiIsImtpZCI6InJNMXRXYnhMOHFHWTlqTjAiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL252eG50cWtubWxocmh2aHZuZGlsLnN1cGFiYXNlLmNvL2F1dGgvdjEiLCJzdWIiOiI2YTIwYTI3NC1hMDFmLTQ4YTYtYjAyOC1kMGM5MzA3MGI3YjQiLCJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzYwNTc2MDM4LCJpYXQiOjE3NjA1NzI0MzgsImVtYWlsIjoianVuaW5ob2gybzJAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJkaXNwbGF5X25hbWUiOiJWb3ogZG8gQmFpcnJvIiwiZW1haWwiOiJqdW5pbmhvaDJvMkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiI2YTIwYTI3NC1hMDFmLTQ4YTYtYjAyOC1kMGM5MzA3MGI3YjQifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTc2MDU2ODg0OX1dLCJzZXNzaW9uX2lkIjoiYzY2MWFhMzEtODU2YS00MWY4LWI4ZmItZmRiNzQ2YWE1ZWM2IiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.X11BDRiphiRO-VJbkYnm0l9QMRLi3VfHQ5Qvn5mISnI"; // mova sua token pra variável de ambiente
const apikey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52eG50cWtubWxocmh2aHZuZGlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2NTg1MTYsImV4cCI6MjA3MTIzNDUxNn0.1wKazj7hbStpDLfsl91v5a0ZKQenXPYZSbkCVToVdYs"

function randFloatDecimals(min, max, decimals) {
  const factor = 10 ** decimals;
  const r = Math.random() * (max - min) + min;
  return Math.round(r * factor) / factor;
}

async function anon() {
  try {
    const lat = randFloatDecimals(-23.9, -23, 4);
    const lon = randFloatDecimals(-46.9, -46, 4);

    const config = {
      method: 'post',
      url: 'https://nvxntqknmlhrhvhvndil.supabase.co/rest/v1/relatorios',
      headers: {
        'Content-Type': 'application/json',
        'apikey': apikey,
        Authorization: `Bearer ${auth}`,
        'Prefer': 'return=representation'
      },
      data: {
        usuario_id: '6a20a274-a01f-48a6-b028-d0c93070b7b4',
        tipo_problema: 'buraco',
        gravidade: 'alta',
        titulo: 'Teste via Axios',
        descricao: 'Testando inserção pelo Axios',
        latitude: lat,
        longitude: lon,
        fotos: [],
        status: 'pendente'
      },
      timeout: 10000 // opcional: timeout de 10s
    };

    const response = await axios(config);
    console.log('✅ Sucesso:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Erro:', error.response?.data || error.message);
    // pode retornar null ou relançar se quiser parar o loop
    return null;
  }
}

// sleep util
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// flag para controlar a execução (permite ctrl+c)
let running = true;
process.on('SIGINT', () => {
  console.log('\nRecebido SIGINT — parando o loop...');
  running = false;
});

(async () => {
  const delayMs = 2000; // intervalo entre requisições: 2000ms = 2s (ajuste conforme necessário)
  while (running) {
    await anon();        // aguarda terminar a requisição antes de continuar
    await sleep(delayMs);
  }
  console.log('Loop finalizado.');
})();
