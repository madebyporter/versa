require 'slim'
require 'json'

###
# Page options, layouts, aliases and proxies
###

set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'

# Per-page layout changes:
#
# With no layout
page '/*.yaml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Set slim-lang output style
Slim::Engine.set_default_options :pretty => true

# With alternative layout
# page '/path/to/file.html', layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy '/this-page-has-no-template.html', '/template-file.html', locals: {
#  which_fake_page: 'Rendering a fake page with a local variable' }

activate :directory_indexes
set :relative_links, true
activate :relative_assets
set :debug_assets, true

# Sounds Layout
# page "/sounds/*", :layout => "sounds_layout"

# Contact Layout
# page "/contact/*", :layout => "contact_layout"

###
# Helpers
###

activate :blog do |blog|
  # set options on blog
  blog.prefix = "/"
  blog.layout = "twigs_layout"
  blog.permalink = "twig/{category}/{title}.html"
  blog.sources = "twig/{title}.html"

  blog.taglink = "branches/{tag}.html"
  blog.tag_template = "branch.html"

  # Custom collection
  blog.custom_collections = {
    category: {
      link: '/trunks/{category}.html',
      template: '/trunk.html'
    }
  }
end

# ready do
#   sitemap.resources.group_by {|p| p.data["category"] }.each do |category, pages|
#     proxy "/trunks/#{category}.html", "trunks.html",
#       :locals => { :category => category, :pages => pages }
#   end
# end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end


# Methods defined in the helpers block are available in templates
# helpers do
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
  set :strip_index_file, true

  # ignore '*.php'
end

# string = File.read('data/soundlist.json')
# json = JSON.parse(string)
