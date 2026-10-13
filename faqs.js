import { fetchJSON } from "./api.js";

export async function loadFAQs() {
  const container = document.getElementById("faqContainer");
  try {
    const faqs = await fetchJSON("./data/faqs.json");
    renderFAQs(faqs);
  } catch (error) {
    console.error("FAQ loading error:", error);
    container.textContent = "FAQs could not be loaded right now.";
  }
}

function renderFAQs(faqs) {
  const container = document.getElementById("faqContainer");
  container.replaceChildren();

  faqs.forEach((faq, index) => {
    const item = document.createElement("div");
    item.className = "faq";

    const question = document.createElement("button");
    question.className = "faq-question";
    question.type = "button";
    question.textContent = faq.question;
    question.id = `faq-question-${faq.id ?? index + 1}`;
    question.setAttribute("aria-expanded", "false");

    const answer = document.createElement("div");
    answer.className = "faq-answer";
    answer.id = `faq-answer-${faq.id ?? index + 1}`;
    answer.setAttribute("role", "region");
    answer.setAttribute("aria-labelledby", question.id);
    answer.textContent = faq.answer;
    question.setAttribute("aria-controls", answer.id);

    question.addEventListener("click", () => {
      const isOpen = question.getAttribute("aria-expanded") === "true";
      question.setAttribute("aria-expanded", String(!isOpen));
      answer.classList.toggle("show", !isOpen);
    });

    item.append(question, answer);
    container.appendChild(item);
  });
}
