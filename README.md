<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Escobar Digital AI System</title>

<style>
body{
  margin:0;
  font-family:Arial;
  background:#070707;
  color:#fff;
}

/* HEADER */
header{
  display:flex;
  justify-content:space-between;
  padding:20px 50px;
  border-bottom:1px solid #222;
  background:#000;
}
.logo{
  color:silver;
  font-weight:bold;
  letter-spacing:2px;
}
nav a{
  color:#aaa;
  margin-left:20px;
  text-decoration:none;
}
nav a:hover{color:#fff}

/* HERO */
.hero{
  text-align:center;
  padding:110px 20px;
  background:radial-gradient(circle,#1a1a1a,#000);
}
.hero h1{
  font-size:58px;
  color:silver;
}
.hero p{
  max-width:650px;
  margin:auto;
  color:#bbb;
}
.btn{
  margin-top:20px;
  padding:14px 30px;
  background:silver;
  border:none;
  font-weight:bold;
  cursor:pointer;
}
.btn:hover{background:#fff}

/* SECTIONS */
.section{
  padding:80px 50px;
  text-align:center;
}
.section h2{color:silver}

/* GRID */
.grid{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));
  gap:20px;
}
.card{
  background:#111;
  border:1px solid #222;
  padding:20px;
}

/* FORM */
.form-box{
  background:#111;
  padding:40px;
  max-width:500px;
  margin:auto;
  border:1px solid #222;
}
input{
  width:100%;
  padding:12px;
  margin:10px 0;
  background:#000;
  border:1px solid #333;
  color:#fff;
}
button{
  width:100%;
  padding:12px;
  background:silver;
  border:none;
  font-weight:bold;
  cursor:pointer;
}
button:hover{background:#fff}

/* CTA FLOAT */
.float-cta{
  position:fixed;
  bottom:20px;
  right:20px;
  background:silver;
  color:black;
  padding:12px 18px;
  font-weight:bold;
  text-decoration:none;
}
</style>
</head>

<body>

<header>
  <div class="logo">ESCOBAR AI SYSTEM</div>
  <nav>
    <a href="#money">Money System</a>
    <a href="#ai">AI Trading</a>
    <a href="#access">Access</a>
  </nav>
</header>

<!-- HERO -->
<section class="hero">
  <h1>Build Money Systems. Not Jobs.</h1>
  <p>
    Escobar AI System combines digital business infrastructure + AI trading logic + automation funnels
    to create income systems that run without emotional decision-making.
  </p>
  <button class="btn">Enter System</button>
</section>

<!-- MONEY SYSTEM -->
<section id="money" class="section">
  <h2>💰 Digital Money System</h2>
  <div class="grid">

    <div class="card">
      <h3>Lead Generation Engine</h3>
      <p>Turn traffic into emails, WhatsApp leads, and clients automatically.</p>
    </div>

    <div class="card">
      <h3>Service Monetization</h3>
      <p>Sell digital skills (websites, funnels, branding) as packaged systems.</p>
    </div>

    <div class="card">
      <h3>Automation Flow</h3>
      <p>Reduce manual work. Every click pushes toward conversion.</p>
    </div>

  </div>
</section>

<!-- AI TRADING BRAND -->
<section id="ai" class="section">
  <h2>🤖 AI Trading Brand System</h2>
  <div class="grid">

    <div class="card">
      <h3>AI Market Logic</h3>
      <p>Structure-based trading mindset using probability, not emotion.</p>
    </div>

    <div class="card">
      <h3>Risk Engine</h3>
      <p>Capital protection rules designed for long-term survival.</p>
    </div>

    <div class="card">
      <h3>Execution Discipline</h3>
      <p>Remove impulsive trades. Follow system rules only.</p>
    </div>

  </div>
</section>

<!-- SYSTEM LOGIC -->
<section class="section">
  <h2>⚙️ How The Engine Works</h2>
  <p style="max-width:700px;margin:auto;color:#aaa;">
    Attention → Capture → Trust → Offer → Conversion → Reinvestment → Scale  
    <br><br>
    This is not content. This is infrastructure.
  </p>
</section>

<!-- LEAD CAPTURE -->
<section id="access" class="section">
  <h2>🚀 Get Access to the System</h2>

  <div class="form-box">
    <form onsubmit="sendLead(event)">
      <input type="text" id="name" placeholder="Name" required>
      <input type="email" id="email" placeholder="Email" required>
      <button type="submit">Join System</button>
    </form>
  </div>
</section>

<!-- FLOAT CTA -->
<a class="float-cta" href="https://wa.me/" target="_blank">
  WhatsApp Me
</a>

<footer style="text-align:center;padding:20px;color:#666;">
  © 2026 Escobar AI System — Built for Operators Only
</footer>

<script>
function sendLead(e){
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  let message = `New Lead:%0AName: ${name}%0AEmail: ${email}`;

  // Redirect to WhatsApp (replace number)
  window.open("https://wa.me/?text=" + message, "_blank");
}
</script>

</body>
</html>
