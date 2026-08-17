var visible = 5;

const comments = [
	{
		order: 1,
		likes: 1,
		avatar: `./assets/images/1.jpg`,
		profile: ``,
		name: `Michael Turner`,
		text: `Just finished my Sam's Club shopping trip with the gift card! Got so many groceries can't believe it:`,
		image: `./assets/images/test7.jpg`,
		age: `a week ago`,
		comments: []
	},
	{
		order: 2,
		likes: 1,
		avatar: `./assets/images/2.jpg`,
		profile: ``,
		name: `Sarah Wilson`,
		text: `Hoping to get selected for the next round of Sam's Club gift cards! The deals look amazing right now`,
		image: null,
		age: `a week ago`,
		comments: []
	},
	{
		order: 3,
		likes: 3,
		avatar: `./assets/images/3.jpg`,
		profile: ``,
		name: `David Anderson`,
		text: `Stocked up on everything I needed. Many thanks to the whole Customer Appreciation Reward team:`,
		image: `./assets/images/test1.jpg`,
		age: `a week ago`,
		comments: [
			{
				likes: 16,
				avatar: `./assets/images/brand.jpg`,
				profile: ``,
				name: `Customer Appreciation Reward`,
				text: `That's wonderful, David! Glad you could get everything you needed!`,
				age: `a week ago`,
			},
			{
				likes: 3,
				avatar: `./assets/images/3.jpg`,
				profile: ``,
				name: `David Anderson`,
				text: `Much appreciated!`,
				age: `a week ago`,
			}
		]
	},
	{
		order: 4,
		likes: 7,
		avatar: `./assets/images/4.jpg`,
		profile: ``,
		name: `Jennifer Martinez`,
		text: `It came at the perfect time.. got all my groceries and essentials for the whole family`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 5,
		likes: 7,
		avatar: `./assets/images/5.jpg`,
		profile: ``,
		name: `Emily Thompson`,
		text: `Look at this! This gift card was such a blessing, very grateful for this opportunity:`,
		image: `./assets/images/test6.jpg`,
		age: `two weeks ago`,
		comments: [
			{
				likes: 25,
				avatar: `./assets/images/brand.jpg`,
				profile: ``,
				name: `Customer Appreciation Reward`,
				text: `That's what we love to see, Emily! Happy shopping!`,
				age: `two weeks ago`,
			}
		]
	},
	{
		order: 6,
		likes: 8,
		avatar: `./assets/images/10.jpg`,
		profile: ``,
		name: `Jessica Baker`,
		text: `Managed to buy so many things, the prices are unbeatable. I'm a big faaan of this store`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 7,
		likes: 3,
		avatar: `./assets/images/11.jpg`,
		profile: ``,
		name: `William Carter`,
		text: `First time getting a gift card from this Program and I'm impressed! Made my monthly shopping so much easier:`,
		image: `./assets/images/test2.jpg`,
		age: `two weeks ago`,
		comments: [
			{
				likes: 56,
				avatar: `./assets/images/brand.jpg`,
				profile: ``,
				name: `Customer Appreciation Reward`,
				text: `We're happy to hear about your positive experience, William!`,
				age: `two weeks ago`,
			}
		]
	},
	{
		order: 8,
		likes: 12,
		avatar: `./assets/images/12.jpg`,
		profile: ``,
		name: `Christopher Davis`,
		text: `This program is amazing! Saved me a lot on my shopping budget. Thank you guys`,
		image: `./assets/images/test5.jpg`,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 9,
		likes: 3,
		avatar: `./assets/images/13.jpg`,
		profile: ``,
		name: `Lauren Rodriguez`,
		text: `My friend just showed me her shopping haul from this program. Can't wait for the next round of applications`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 10,
		likes: 1,
		avatar: `./assets/images/14.jpg`,
		profile: ``,
		name: `Robert Johnson`,
		text: `Perfect timing with these rising prices. The gift card helped us a lot!! Very thankful`,
		image: null,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 11,
		likes: 1,
		avatar: `./assets/images/15.jpg`,
		profile: ``,
		name: `Daniel White`,
		text: `Never thought I'd get selected but here we are! Take a look at today's shopping trip results:`,
		image: `./assets/images/test3.jpg`,
		age: `two weeks ago`,
		comments: []
	},
	{
		order: 13,
		likes: 6,
		avatar: `./assets/images/20.jpg`,
		profile: ``,
		name: `Michelle Scott`,
		text: `Been wanting to do some big shoppings for a while. This gift card made it possible haha`,
		image: `./assets/images/test4.jpg`,
		age: `two weeks ago`,
		comments: []
	}
];

const obj_comment = `
<div class="comment sort-coms start-coms" data-order="{{ORDER}}" data-likes="{{LIKES}}">
	<a class="comment-user-img"
		target="_self"><img src="{{AVATAR}}" width="48" height="48" alt="{{USERNAME}}" /></a>
	<a target="_blank" style="color: #2f6aec; cursor: default;"
		class="comment-user-name"><span> {{USERNAME}} </span></a>
	<p class="comment-text">{{COMMENT_TEXT}}</p>
	{{COMMENT_IMG}}
	<div class="comment-meta">
		<button>Like</button><span> · </span>
		<button>Reply</button><span> · </span>
		<span class="total-likes">{{LIKES}}</span><span> · </span>
		<span class="comment-age">{{TIMEAGO}}</span>
	</div>
	{{SUB_COMMENTS}}
</div>
`;

const obj_sub_comment = `
<div class="comment">
	<a class="comment-user-img"
		target="_self"><img src="{{AVATAR}}" width="48" height="48" alt="{{USERNAME}}" /></a>
	<a target="_blank" style="color: #2f6aec; cursor: default;"
		class="comment-user-name"><span> {{USERNAME}} </span></a>
	<p class="comment-text">{{COMMENT_TEXT}}</p>
	<div class="comment-meta">
		<button>Like</button><span> · </span>
		<button>Reply</button><span> · </span>
		<span class="total-likes">{{LIKES}}</span><span> · </span>
		<span class="comment-age">{{TIMEAGO}}</span>
	</div>
</div>
`;

const renderComments = () => {
	let html = ``;

	for (var comment of comments) {
		let sub_comments = ``;

		for (var scomment of comment.comments) {
			sub_comments += obj_sub_comment
				.replace (new RegExp ('{{PROFILE_URL}}', 'g'), scomment.profile)
				.replace (new RegExp ('{{AVATAR}}', 'g'), scomment.avatar)
				.replace (new RegExp ('{{USERNAME}}', 'g'), scomment.name)
				.replace (new RegExp ('{{COMMENT_TEXT}}', 'g'), scomment.text)
				.replace (new RegExp ('{{LIKES}}', 'g'), scomment.likes)
				.replace (new RegExp ('{{TIMEAGO}}', 'g'), scomment.age);
		};

		let img_html = comment.image
			? `<img class="fb-img" src="${comment.image}" width="210" alt="${comment.name}"/>`
			: ``;

		html += obj_comment
			.replace (new RegExp ('{{PROFILE_URL}}', 'g'), comment.profile)
			.replace (new RegExp ('{{AVATAR}}', 'g'), comment.avatar)
			.replace (new RegExp ('{{USERNAME}}', 'g'), comment.name)
			.replace (new RegExp ('{{COMMENT_TEXT}}', 'g'), comment.text)
			.replace (new RegExp ('{{COMMENT_IMG}}', 'g'), img_html)
			.replace (new RegExp ('{{LIKES}}', 'g'), comment.likes)
			.replace (new RegExp ('{{ORDER}}', 'g'), comment.order)
			.replace (new RegExp ('{{TIMEAGO}}', 'g'), comment.age)
			.replace (new RegExp ('{{SUB_COMMENTS}}', 'g'), sub_comments);
	};

	return html;
};

jQuery.fn.orderBy = function (keySelector, order) {
	return this.sort(function(a,b) {
		a = keySelector.apply(a);
		b = keySelector.apply(b);
		if(order == "newest") {
			if (a > b)
				return 1;
			if (a < b)
				return -1;
			return 0;
		} else if(order == "oldest" || order == "top") {
			if (a < b)
				return 1;
			if (a > b)
				return -1;
			return 0;
		}
	});
};

$(document).ready(function() {
	const html_comms = renderComments ();

	$(".main-comments").html (html_comms);

	setTimeout(function() {
		$(".sorting-box > p").html("130 comments");
		$(".start-coms").removeClass("start-coms");
	}, 250);

	$(document).on('click', 'textarea', function() {
		$(".add-comment").addClass("active");
	});

	$(".comment-button-left [type=checkbox]").on('change', function() {
		if($(this).is(":checked") && text_remaining > 0) {
			$(".comment-button-left p").show();
			$(".comment-button-right button").addClass("disabled").prop("disabled", true);
		} else {
			$(".comment-button-left p").hide();
			$(".comment-button-right button").removeClass("disabled").prop("disabled", false);
		}
	});

	$(document).on('click', '.sort > button', function() {
		var $this = $(this);
		$this.next().is(":visible") ? $this.next().hide() : $this.next().show();
	});

	$(document).on('click', '.dropdown-sort button', function() {
		var $this = $(this);
		var sort_by = $this.data("sort") == "top" ? "likes" : "order";
		$this.parent().hide();
		$this.parent().find(".selected").removeClass("selected");
		$this.addClass("selected");
		$(".sort > button span").html($this.find("span").html());
		$(".sort-coms").orderBy(function() {return +$(this).data(sort_by);}, $this.data("sort")).appendTo(".main-comments");
		$(".inner-sorting-box > svg").css({display: "inline-block"});
		setTimeout(function() { $(".inner-sorting-box > svg").hide(); }, 200);
		$(".sort-coms").hide();
		for(var i = 0;i<visible;i++) {
			$(".main-comments > :hidden:first").show();
		}
	});

	$(document).on('click', '.load-more', function() {
		var elem = $(".main-comments > :hidden").length < 5 ? $(".main-comments > :hidden").length : 5;
		for(var i = 0;i<elem;i++) {
			$(".main-comments > :hidden:first").show();
		}
		visible = visible + elem;
		if(visible == $(".sort-coms").length) {
			$(this).addClass("end-coms").prop("disabled", true).find("span").html("Loading...");
		}
	});

	$("textarea").keyup(function() {
		var text_length = $(this).val().length;
		text_length <= 0 ? $(".comment-button-right button").addClass("disabled").prop("disabled", true) : $(".comment-button-right button").removeClass("disabled").prop("disabled", false);
		text_remaining = 6 - text_length;
		$(".comment-button-left p").html("Write "+text_remaining+" more characters to post to Facebook");
		if($(".comment-button-left [type=checkbox]").is(":checked")) {
			if(text_remaining <= 0) {
				$(".comment-button-left p").hide();
				$(".comment-button-right button").removeClass("disabled").prop("disabled", false);
			} else {
				$(".comment-button-left p").show();
				$(".comment-button-right button").addClass("disabled").prop("disabled", true);
			}
		}
	});

	$(".comment-button-right button").on('click', function() {
		alert("Comments are disabled by the author.")
	});

	$(".comment-meta button").on('click', function() {
		alert("Action prohibited. You are not authenticated.");
	});
});