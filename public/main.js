// Scroll reveal
function handleScrollReveal() {
  const elements = document.querySelectorAll(".card, .hero-inner");
  const triggerBottom = window.innerHeight * 0.85;

  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < triggerBottom) {
      el.classList.add("visible");
    }
  });
}

window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);

// Hover glow follow mouse
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".card, .hero-inner").forEach((card) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mouse-x", `${x}%`);
    card.style.setProperty("--mouse-y", `${y}%`);
  });
});

// Contact form
const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const status = document.getElementById("contact-status");
    status.textContent = "Sending...";

    const data = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json();
      if (!res.ok) throw new Error(body.message || "Failed");

      status.textContent = "Message sent successfully.";
      form.reset();
    } catch (err) {
      status.textContent = "Something went wrong. Please try again.";
    }
  });
}

// Terminal simulation
const terminalBody = document.getElementById("terminal-body");
const terminalInput = document.getElementById("terminal-input");

if (terminalBody && terminalInput) {
  const bannerLines = [
    "Ubuntu 22.04.3 LTS (naveen-portfolio)   \\l",
    "",
    "Type 'help' to see available commands."
  ];

  const commands = {
    help: () => [
      "Available commands:",
      "  help         - show this help",
      "  whoami       - about me as DevOps engineer",
      "  skills       - key tools and platforms I use",
      "  projects     - short summary of my main work",
      "  ls           - list sections of this portfolio",
      "  pwd          - show current path",
      "  kubectl      - show sample kubectl output",
      "  clear        - clear the terminal"
    ],
    whoami: () => [
      "naveen",
      "Naveen Kumar â€“ Junior DevOps Engineer (Chennai, India).",
      "I design and automate cloud-native infrastructure on Azure and AWS with Kubernetes, CI/CD and observability."
    ],
    skills: () => [
      "Cloud   : Azure (AKS, VNet, Key Vault, Storage), AWS (EC2, S3, VPC, RDS, Route53)",
      "Tools   : Kubernetes, Docker, Helm, Terraform",
      "CI/CD   : GitHub Actions, Jenkins, Azure DevOps Pipelines",
      "Monitor : Prometheus, Grafana, New Relic"
    ],
    projects: () => [
      "Ivanti Service Manager:",
      "  New Relic monitoring for 1000+ VMs, dashboards, APM, and AKS migration support.",
      "",
      "SIEMply Secure:",
      "  Secure AKS + ECK platform with Traefik, cert-manager, GitHub Actions CI/CD."
    ],
    ls: () => [
      "about  certifications  terminal  experience  skills  education  contact"
    ],
    pwd: () => [
      "/home/naveen/portfolio"
    ],
    kubectl: () => [
      "NAME                                 READY   STATUS    RESTARTS   AGE",
      "aks-monitoring-0                     1/1     Running   0          5d",
      "eck-elasticsearch-0                  1/1     Running   1          5d",
      "eck-kibana-0                         1/1     Running   0          5d",
      "demo-api-deployment-7f9b4d88c9-abc   1/1     Running   2          3d"
    ],
    clear: () => []
  };

  function appendLine(content, className = "output") {
    const div = document.createElement("div");
    div.className = `line ${className}`;
    div.textContent = content;
    terminalBody.appendChild(div);
    terminalBody.scrollTop = terminalBody.scrollHeight;
  }

  // Show banner on load
  bannerLines.forEach(line => appendLine(line));

  terminalInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const input = terminalInput.value.trim();
      if (!input) return;

      // Echo command
      appendLine(`naveen@portfolio:~$ ${input}`, "cmd-line");

      const [cmd] = input.split(/\s+/);
      const fn = commands[cmd];

      if (!fn) {
        appendLine(`Command not found: ${cmd}. Type "help" to list commands.`);
      } else if (cmd === "clear") {
        terminalBody.innerHTML = "";
      } else {
        fn().forEach(line => appendLine(line));
      }

      terminalInput.value = "";
    }
  });

  const win = document.querySelector(".terminal-window");
  if (win) {
    win.addEventListener("click", () => terminalInput.focus());
  }
}
