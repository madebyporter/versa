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


###
# Helpers
###

activate :blog do |blog|
  # set options on blog
  blog.prefix = "/"
  blog.layout = "twig_layout"
  blog.permalink = "twig/{category}/{title}.html"
  blog.sources = "twig/{title}.html"

  blog.taglink = "branches/{tag}.html"
  blog.tag_template = "tags.html"

  # Custom collection
  blog.custom_collections = {
    category: {
      link: '/trunks/{category}.html',
      template: '/categories.html'
    }
  }
end

# Reload the browser automatically whenever files change
configure :development do
  activate :livereload
end


# Methods defined in the helpers block are available in templates
helpers do
  def discover_title(page = current_page)
    page.data.title || page.render({layout: false}).match(/<h.+>(.*?)<\/h1>/) do |m|
      m ? m[1] : page.url.split(/\//).last.titleize
    end
  end
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript
  set :strip_index_file, true
  # ignore '*.php'
end
