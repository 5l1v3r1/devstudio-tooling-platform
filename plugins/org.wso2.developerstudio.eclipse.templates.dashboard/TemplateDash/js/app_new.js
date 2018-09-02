var colorOrange = "#f47a20";
var colorOrange2 = "#ffffff";
var colorBorder = "#ffffff";
var rectAnimationDuration = 50;

var centerLogo;

var w = window,
    d = document,
    e = d.documentElement,
    g = d.getElementsByTagName('body')[0],
    x = w.innerWidth || e.clientWidth || g.clientWidth,
    totalHeight = w.innerHeight || e.clientHeight || g.clientHeight;

var animationDuration = 250;

function setViewPortFullScreen(duration) {
    svgArea.animate({viewBox: (cx - 650 / 2) + ' ' + (cy - 650 / 2) + ' ' + 650 + ' ' + 650}, duration);
}

function loadWelcomeNodes() {
    var contributionsString = GetIDEDashboardWizards();
    var contributions = JSON.parse(contributionsString);
    alert(contributionsString);
    var welcomeNodes = [];
    contributions.forEach(function (contribution) {
        var welcomeNode = {};
        welcomeNode.title = contribution.name;
        //welcomeNode.title = welcomeNode.title.split(/ /g)[0];
        welcomeNode.icon = contribution.iconURL;
        welcomeNode.nodes = [];
        contribution.wizards.forEach(function (wizard) {
            var wizardNode = {};
            wizardNode.title = wizard.id;
            wizardNode.wizardID = wizard.name;
            wizardNode.priority = wizard.priority;
            welcomeNode.nodes.push(wizardNode);
        });
        welcomeNodes.push(welcomeNode);
    });
    return welcomeNodes;
}

var welcomeNodeArray = loadWelcomeNodes();
var esbNewProjectWizard = "org.wso2.developerstudio.eclipse.artifact.newesbsolutionproject";
var projectExportWizard = "org.wso2.developerstudio.eclipse.distribution.exportAsArtifact";

/*var mavenWizard = "org.wso2.developerstudio.eclipse.platform.ui.mvn.wizard.MvnMultiModuleWizard";
var cappWizard = 'org.wso2.developerstudio.eclipse.distribution.project';
var serverWizard = 'org.eclipse.wst.server.ui.new.server';

if((GetWizardDescription(mavenWizard) != null)){
    welcomeNodeArray.push({title: "Maven", nodes: [
        {title: '', wizardID: mavenWizard}
    ]});
}

if((GetWizardDescription(cappWizard) != null)){
    welcomeNodeArray.push({title: "CApp", nodes: [
        {title: '', wizardID: cappWizard}
    ]});
}

if((GetWizardDescription(serverWizard) != null)){
    welcomeNodeArray.push({title: "Add runtime", nodes: [
        {title: '', wizardID: serverWizard}
    ]});
}*/

$("#createNewProject").click(function(){
	OpenIDEWizard(esbNewProjectWizard);
}); 

$("#openExistingProject").click(function(){
	OpenIDEWizard(projectExportWizard);
});

$(window).resize(function () {
    $('.wso2-logo').css("left", $(".header").width() - $('.wso2-logo').width() - $('.devs-logo').width() - 40);
    location.reload();
});

welcomeNodeArray.forEach(function (welcomeNode) {
	//$("#root-container").append("<h1>" + welcomeNode.title + "</h1>" );
	welcomeNode.nodes.forEach(function (childNode) {
		escapedChildTitle = childNode.title.replace(/\./g, '');
		templateNode = createTemplateNode(escapedChildTitle, GetWizardDescription(childNode.wizardID), GetWizardDescription(childNode.wizardID));
		$("#esb-templates").append(templateNode);		
		$("#"+escapedChildTitle).click(function(){
			OpenIDEWizard(childNode.wizardID);
	    });
	});
	
});

function createTemplateNodeOld(templateID, templateName, templateDescription){
	var html = " &lt;div class=&quot;col-sm-4 col-md-3 template&quot; id=&quot;"+ templateID +"&quot;&gt; &lt;div class=&quot;thumb&quot;&gt; &lt;a href=&quot;#&quot;&gt; &lt;img data-src=&quot;holder.js/533x400?auto=yes&amp;random=yes&quot; class=&quot;img-responsive&quot;&gt; &lt;div class=&quot;hover-opaque&quot;&gt; "+ templateDescription +" &lt;/div&gt;&lt;/a&gt; &lt;/div&gt;&lt;div class=&quot;thumb thumb-caption text-center&quot;&gt; &lt;figcaption&gt;&lt;a href=&quot;#&quot;&gt;"+ templateName +"&lt;/a&gt;&lt;/figcaption&gt; &lt;/div&gt;&lt;/div&gt;"
	return html;
}

function createTemplateNode(templateID, templateName, templateDescription){
	var html = "<div class='col-sm-4 col-md-3 template' id='"+ templateID +"'> <div class='thumb'> <a href='#'> <img data-src='holder.js/533x400?auto=yes&random=yes' class='img-responsive'> <div class='hover-opaque'>"+ templateDescription +"</div></a> </div><div class='thumb thumb-caption text-center'> <figcaption><a href='#'>"+ templateName +"</a></figcaption> </div></div>";
	return html;
}

function setOpacityOfLogo(op, dur) {
    centerLogo.select('#circle3041').animate({opacity: op}, dur);
    centerLogo.select('#path3043').animate({opacity: op}, dur);
    centerLogo.select('#path3045').animate({opacity: op}, dur);
}

function hideUnselectedNodes() {
    if (selectedNode != null) {
        centerCircle.animate({opacity: 0}, animationDuration);
        setOpacityOfLogo(0, animationDuration);
        centeredMainText.animate({opacity: 0}, animationDuration);
        welcomeNodeArray.forEach(function (node) {
            node.line.animate({opacity: 0}, animationDuration / 5);
            if (node != selectedNode) {
                node.circle.animate({opacity: 0}, animationDuration);
                node.text.animate({opacity: 0}, animationDuration);
                node.image.animate({opacity: 0}, animationDuration);
            }
        });
    }
}

function showUnselectedNodes() {
    centerCircle.animate({opacity: 100}, animationDuration);
    setOpacityOfLogo(100, animationDuration);
    centeredMainText.animate({opacity: 100}, animationDuration);
    welcomeNodeArray.forEach(function (node) {
        node.line.animate({opacity: 100}, animationDuration);
        if (node != selectedNode) {
            node.circle.animate({opacity: 100}, animationDuration);
            node.text.animate({opacity: 100}, animationDuration);
            node.image.animate({opacity: 100}, animationDuration);
        }
    });
}

$('#zoomInIconP').click(function () {
    setSelectedNode(null);
    setTimeout(function () {
        setViewPortFullScreen(400);
        showUnselectedNodes();
    }, animationDuration);
});

