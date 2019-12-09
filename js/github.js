/**
 * 
 * @author Vinit Shahdeo <vinitshahdeo@gmail.com>
 */
$(function() {

    $('#ghsubmitbtn').on('click', function(e) {
        $('#sharing').hide();
        e.preventDefault();
        $('#ghapidata').html('<center><div id="loader"><i class="fa fa-github fa-main faa-burst animated fa-4x"></i></div></center>');

        var username = $('#ghusername').val();
        var requri = 'https://api.github.com/users/' + username;
        var repouri = 'https://api.github.com/users/' + username + '/repos?per_page=200';
        var orgs = 'https://api.github.com/users/' + username + '/orgs';

        requestJSON(requri, function(json) {
            if (json.message == "Not Found" || username == '') {
                $('#ghapidata').html("<center></center><br/><h4 class='no-user'><i class='fa fa-frown-o' aria-hidden='true'></i><br/>Sorry! No User Info Found.</h4>");
            } else {
                //$("#copyright").css("display", "none");
                $('#copyright').hide();

                // else we have a user and we display their info
                var fullname = json.name;
                var username = json.login;
                var aviurl = json.avatar_url;
                var profileurl = json.html_url;
                var location = json.location;
                var followersnum = json.followers;
                var followingnum = json.following;
                var reposnum = json.public_repos;
                var date = json.created_at;
                var site = json.blog;
                var location = json.location;
                var bio = json.bio;
                var type = json.type;
                var repobytype = json.type;
                var sinceDate = date.split('-');
                var year = sinceDate[0];
                var month = sinceDate[1];
                switch (month) {
                    case '01':
                        month = 'January';
                        break;
                    case '02':
                        month = 'February';
                        break;
                    case '03':
                        month = 'March';
                        break;
                    case '04':
                        month = 'April';
                        break;
                    case '05':
                        month = 'May';
                        break;
                    case '06':
                        month = 'June';
                        break;
                    case '07':
                        month = 'July';
                        break;
                    case '08':
                        month = 'August';
                        break;
                    case '09':
                        month = 'September';
                        break;
                    case '10':
                        month = 'October';
                        break;
                    case '11':
                        month = 'November';
                        break;
                    case '12':
                        month = 'December';
                        break;
                    default:
                        month = ' ';

                }
                if (bio == null) {
                    bio = " ";

                }
                if (location == null) {
                    location = " ";
                }
                if (site == null) {
                    site = " ";
                }

                if (type == "User") {
                    type = " ";
                }
                if (fullname == undefined) {
                    fullname = username;
                }

                var outhtml = '<div class="container"><div class="row me-row content-ct speaker " >';
                outhtml = outhtml + '<center><div class="feature"><a href="' + profileurl + '" target="_blank"><center><img src="' + aviurl + '"  alt="' + username + '" class="speaker-img"></center></a><h3>' + fullname + '</h3><h4 class="type">' + type + '</h4><h4 class="location">' + location + '</h4><h5 class="username">(<a href="' + profileurl + '" target="_blank">@' + username + '</a>)<h5><h5 class="website"><a href="' + site + '" target="_blank">' + site + '</a><h5><p>' + bio + '</p><ul class="speaker-social"><li><i class="fa fa-github-alt" aria-hidden="true"><span>' + reposnum + ' Repos </span></i></li><li><i class="fa fa-user" aria-hidden="true"><span>' + followersnum + ' Followers</span></i></li><li><i class="fa fa-user-plus" aria-hidden="true"><span>' + followingnum + ' Following</span></i></li></ul></div></center></div></div>';



                outhtml = outhtml + '<div class="container"><div class="row me-row content-ct speaker" >';

                var repositories;
                var totalstars = 0,
                    totalforks = 0;
                var languages = new Array();
                var i = 0;

                $.getJSON(repouri, function(json) {
                    repositories = json;
                    outputPageContent();
                });

                function outputPageContent() {
                    if (repositories.length == 0) {
                        outhtml = outhtml + '<p class="title"><i class="fa fa-meh-o" aria-hidden="true"></i><br/>OOPS! No repos found by this ' + repobytype.toLowerCase() + '!</p></div>';
                        outhtml = outhtml + '<div class="credit"><hr><a href="https://github.com/vinitshahdeo" target="_blank"><i class="fa fa-github"></i></a><br><span>Made with <i class="fa fa-heart faa-pulse animated fa-4x"></i> by <a href="https://www.facebook.com/vinit.shahdeo" target="_blank">Vinit Shahdeo</a></span><br/><span class="github-logo1">GitHub <span class="lookbook">LookBook</span> &copy; 2017</div>';
                    } else {
                        outhtml = outhtml + '<p><strong>List of Repos by this ' + repobytype.toLowerCase() + '</strong></p>';
                        outhtml = outhtml + '<p><a href="#githubreport"><center><i class="fa fa-chevron-circle-down" aria-hidden="true"></i></center></a></p>'
                        $.each(repositories, function(index) {
                            var reponame = repositories[index].name;
                            var repourl = repositories[index].html_url;
                            var homepage = repositories[index].homepage;
                            var language = repositories[index].language;
                            var description = repositories[index].description;
                            var stars = repositories[index].stargazers_count;
                            var forks = repositories[index].forks_count;
                            var size = repositories[index].size;

                            var lastUpdateDate = repositories[index].updated_at;
                            var lastUpdate = lastUpdateDate.split('-');
                            var lastUpdateYear = lastUpdate[0];
                            var lastUpdateMonth = lastUpdate[1];
                            var lastUpdateDate = lastUpdate[2].substr(0, 2);

                            switch (lastUpdateMonth) {
                                case '01':
                                    lastUpdateMonth = 'Jan';
                                    break;
                                case '02':
                                    lastUpdateMonth = 'Feb';
                                    break;
                                case '03':
                                    lastUpdateMonth = 'Mar';
                                    break;
                                case '04':
                                    lastUpdateMonth = 'Apr';
                                    break;
                                case '05':
                                    lastUpdateMonth = 'May';
                                    break;
                                case '06':
                                    lastUpdateMonth = 'June';
                                    break;
                                case '07':
                                    lastUpdateMonth = 'July';
                                    break;
                                case '08':
                                    lastUpdateMonth = 'Aug';
                                    break;
                                case '09':
                                    lastUpdateMonth = 'Sept';
                                    break;
                                case '10':
                                    lastUpdateMonth = 'Oct';
                                    break;
                                case '11':
                                    lastUpdateMonth = 'Nov';
                                    break;
                                case '12':
                                    lastUpdateMonth = 'Dec';
                                    break;
                                default:
                                    lastUpdateMonth = ' ';

                            }
                            var demolink = "Link For Demo";
                            var downloadlink = repourl + '/zipball/master';
                            totalstars = totalstars + stars;
                            totalforks = totalforks + forks;

                            if (size >= 1000) {
                                size = size / 1024;
                                size = parseFloat(size.toFixed(2))
                                size = size + ' MB';
                            } else {
                                size = size + ' KB';
                            }
                            if (language != null) {
                                languages[i] = language;
                                i++;
                            }
                            if (homepage == null) {
                                homepage = " ";
                                demolink = " ";
                            }
                            if (language == null) {
                                language = " ";
                            }
                            if (description == null) {
                                description = " ";
                            }
                            outhtml = outhtml + '<div class="col-md-4 col-sm-6 repos repo-element slideanim"><h3><a href="' + repourl + '" target="_blank">' + reponame + '</a></h3><h4 class="langdesc">' + language + '</h4><h5><a href="' + homepage + '" target="_blank">' + demolink + '</a><h5><p class="repo-desc">' + description + '</p><p class="repo-date">Last Updated on ' + lastUpdateMonth + ' ' + lastUpdateDate + ', ' + lastUpdateYear + '</p><ul class="speaker-social"><li><i class="fa fa-star-o" aria-hidden="true"><span>' + stars + '</span></i></li><li><i class="fa fa-code-fork" aria-hidden="true"><span>' + forks + '</span></i></li></ul><a href="' + downloadlink + '"><i class="fa fa-download" aria-hidden="true"><span>' + size + '</span></i></a></div>';




                        });

                        outhtml = outhtml + '</div></div>';
                        outhtml = outhtml + '<center><div class="container"><div class="row me-row content-ct speaker slideanim" id="githubreport"><center><div class="feature"><h2 class="row-title report-title">Github Report</h2><p class="poweredby">Powered by GitHub LookBook</p><h3>Open Source Contribution by ' + fullname + '</h3><hr><p><a href="' + profileurl + '" target="_blank">' + fullname + '</a> is contributing since <strong>' + month + ', ' + year + '</strong>. Till date, ' + fullname + ' has <strong>' + reposnum + ' public repos</strong> with total of <strong>' + totalstars + ' stars</strong> and <strong>' + totalforks + ' forks</strong>.</p>';
                        var j;
                        if (i != 0) {

                            var userLang = [];
                            $.each(languages, function(i, el) {
                                if ($.inArray(el, userLang) === -1) userLang.push(el);
                            });
                            /*userLang.toString();*/
                            outhtml = outhtml + '<p>' + fullname + ' has contributed in</p> <p style="word-break: break-all;">';
                            for (j = 0; j < userLang.length; j++) {
                                if (j != userLang.length - 1) {
                                    outhtml = outhtml + '<strong>' + userLang[j] + '</strong>,&nbsp;';
                                } else {
                                    outhtml = outhtml + '<strong>' + userLang[j] + '</strong>.';
                                }
                            }
                            outhtml = outhtml + '</p>'

                        }

                        outhtml = outhtml + '<p>' + fullname + ' has <strong>' + followersnum + ' followers</strong>. ' + fullname + ' is <strong>following ' + followingnum + '</strong> people. </p>';

                        outhtml = outhtml + '<a href="https://twitter.com/intent/tweet?url=http://github.com/' + username + '/&amp;text=Contributing on GitHub since ' + month + ', ' + year + ' - ' + reposnum + ' repos, ' + totalstars + ' stars, ' + totalforks + ' forks, ' + followersnum + ' followers. &amp;hashtags=GitHubLookBook" target="_blank"" class="tweet-btn" title="Tweet" target="_blank"><button type="button" class="btn btn-secondary btn-sm ghbtn"><i class="fa fa-twitter" aria-hidden="true"><span>Tweet</span></i></button></a></div></center></div></div></center>';



                        outhtml = outhtml + '<div class="credit"><p><a href="#jumptotop"><center><i class="fa fa-chevron-circle-up" aria-hidden="true"></i></center></a></p><hr><a href="https://github.com/vinitshahdeo" target="_blank"><i class="fa fa-github"></i></a><br><span>Made with <i class="fa fa-heart faa-pulse animated fa-4x"></i> by <a href="https://www.facebook.com/vinit.shahdeo" target="_blank">Vinit Shahdeo</a></span><br/><span class="github-logo1">GitHub <span class="lookbook">LookBook</span> &copy; 2019</div>';

                    }

                    $('#ghapidata').html(outhtml);
                } // end outputPageContent()
            } // end else statement
        }); // end requestJSON Ajax call
    }); // end click event handler

    function requestJSON(url, callback) {
        $.ajax({
            url: url,
            complete: function(xhr) {
                callback.call(null, xhr.responseJSON);
            }
        });
    }
});

/* downlods*/
$('#download').click(function() {
    download('http://nogin.info/cv.doc','http://nogin.info/cv.doc');
  });
  
