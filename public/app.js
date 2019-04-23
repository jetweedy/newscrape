
function drawNotes(container, article) {
	console.log(article.notes);
	return;
	
	let div = $("<div>").addClass("note");
	let strong = $("<strong>").text("Title");
	div.text("blah");
	container.append(div);
	
}


function drawArticle(article) {
	let div = $("<div>").addClass("article").attr("id", "article_"+article._id);
	let header = $("<h3>");
	let ahref = $("<a>").text(article.title).attr("href", article.link).attr("target", "_blank");
	header.append(ahref);
	div.append(header);
	$("#articles").append(div);
	
	
	let btnAddNote = $("<button>").text("Add Note").addClass("open-button");
	div.append(btnAddNote);
	btnAddNote.on("click", () => {
		openCommentForm(article._id);
	});
	let divNotes = $("<div>").attr("id", "notes_"+article._id).addClass("notes");
	div.append(divNotes);
	drawNotes(divNotes, article);
}

function loadArticles() {
	$("#articles").html("");
	$.get("/articles/", (articles) => {
		for (let a in articles) {
			drawArticle(articles[a]);
		}
	});
}

function openCommentForm(article_id) { 
	console.log(article_id);
	$("#commentForm").css("display", "block");
	$("#note_article_id").val(article_id);
}

function addArticleNote(article_id, note_title, note_body) {
	console.log(article_id, note_title, note_body);
	try {
		$.post("/article/"+article_id+"/comment"
			, { title: note_title, body: note_body}
			, (res) => {
				$("#commentForm").css("display", "none");
			}
		);
	} catch(err) { 
		console.log(err);
	};
}

$("#btnSubmitNote").on("click", () => {
	addArticleNote($("#note_article_id").val(), $("#note_title").val(), $("#note_body").val()); 
});
$("#btnCloseCommentForm").on("click", () => {
	$("#commentForm").css("display", "none");
});

loadArticles();