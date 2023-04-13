import { Homework_backend } from "../../declarations/Homework_backend";

document.getElementById("addHomework").addEventListener("click", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const dueDate = document.getElementById("dueDate").value;
  document.getElementById("feedback").textContent = "Loading...";
  await Homework_backend.createHomework({
    title,
    description,
    dueDate: parseInt(dueDate),
    completed: false,
  });
  document.getElementById("feedback").textContent = "Homework added";
});

document.getElementById("gethomework").addEventListener("click", async (e) => {
  e.preventDefault();
  const homeworkId = document.getElementById("homeworkId").value;
  document.getElementById("getHomeworkFeedback").textContent = "Loading...";
  const result = await Homework_backend.getHomework(parseInt(homeworkId));
  if (result?.err) {
    document.getElementById("getHomeworkFeedback").textContent = result.err;
  } else {
    const homework = result.ok;
    homework.dueDate = parseInt(homework.dueDate);
    document.getElementById("getHomeworkFeedback").textContent =
      JSON.stringify(homework);
  }
});
document
  .getElementById("updateHomework")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const id = document.getElementById("updatHomeworkId").value;
    const title = document.getElementById("updateTitle").value;
    const description = document.getElementById("updateDescription").value;
    const dueDate = document.getElementById("updateDueDate").value;
    document.getElementById("updateFeedback").textContent = "Loading...";
    const result1 = await Homework_backend.getHomework(parseInt(id));
    if (result1?.err) {
      document.getElementById("updateFeedback").textContent = result1.err;
      return;
    }
    await Homework_backend.updateHomework(parseInt(id), {
      title,
      description,
      dueDate: parseInt(dueDate),
      completed: result1.ok.completed,
    });
    document.getElementById("updateFeedback").textContent = "Update successful";
  });

document
  .getElementById("deleteHomework")
  .addEventListener("click", async (e) => {
    e.preventDefault();
    const homeworkId = document.getElementById("deleteHomeworkId").value;
    document.getElementById("deleteFeedback").textContent = "Loading...";
    const result = await Homework_backend.deleteHomework(parseInt(homeworkId));
    if (result?.err) {
      document.getElementById("deleteFeedback").textContent = result.err;
    } else {
      document.getElementById("deleteFeedback").textContent =
        "Homework deleted";
    }
  });

document
  .getElementById("getAllHomework")
  .addEventListener("click", async () => {
    document.getElementById("getAllHomeworkFeedback").textContent =
      "Loading...";
    const result = await Homework_backend.getAllHomework();
    const parsedResult = result.map((post) => {
      post.dueDate = parseInt(post.dueDate);
      return post;
    });
    document.getElementById("getAllHomeworkFeedback").textContent =
      JSON.stringify(parsedResult);
  });

document
  .getElementById("getPendingHomework")
  .addEventListener("click", async () => {
    document.getElementById("getPendingHomeworkFeedback").textContent =
      "Loading...";
    const result = await Homework_backend.getPendingHomework();
    const parsedResult = result.map((post) => {
      post.dueDate = parseInt(post.dueDate);
      return post;
    });
    document.getElementById("getPendingHomeworkFeedback").textContent =
      JSON.stringify(parsedResult);
  });

document
  .getElementById("markAsComplete")
  .addEventListener("click", async () => {
    document.getElementById("markAsCompleteFeedback").textContent =
      "Loading...";

    const value = document.getElementById("markAsCompleteId").value;
    const result = await Homework_backend.markAsComplete(parseInt(value));
    if (result?.err) {
      document.getElementById("markAsCompleteFeedback").textContent =
        result.err;
    } else {
      document.getElementById("markAsCompleteFeedback").textContent =
        "Homework marked as completed";
    }
  });

document
  .getElementById("searchHomework")
  .addEventListener("click", async () => {
    document.getElementById("searchHomeworkFeedback").textContent =
      "Loading...";

    const value = document.getElementById("searchHomeworkText").value;
    const result = await Homework_backend.searchHomework(value);
    const parsedResult = result.map((post) => {
      post.dueDate = parseInt(post.dueDate);
      return post;
    });
    document.getElementById("searchHomeworkFeedback").textContent =
      JSON.stringify(parsedResult);
  });
