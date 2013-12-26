xml.instruct! :xml, version: "1.0" 
xml.rss version: "2.0" do
  xml.channel do
    xml.title "WundtLab Studies"
    xml.description "a penny for your thought"
    xml.link studies_url

    @studies.each do |study|
      xml.item do
        xml.title study.name
        xml.description study.description
        xml.pubDate study.created_at.to_s(:rfc822)
        # xml.link study.presentation
        xml.link ("http://localhost:3000/dist/preview_export/bespoke.html#" << study.presentation.to_s)
        xml.guid study_url(study)
      end
    end
  end
end