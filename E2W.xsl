<xsl:stylesheet version="2.0" 
xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:opf="http://www.idpf.org/2007/opf"
xmlns:dc="http://purl.org/dc/elements/1.1/"
xmlns:cc="http://creativecommons.org/ns#"
xmlns:xhtml="http://www.w3.org/1999/xhtml"
>

<!--Turn EPUB 3.0.1 package file into WPUB
version 0.001
dtc may 3, 2018
 -->


<!--

COMMAND LINE:

 java -Xmx1024m -cp /Users/cramerd/xml/library/SaxonHE9-6-0-4J/saxon9he.jar:/Users/cramerd/xml/library/resolver.jar \
    -Dxml.catalog.files=/Users/cramerd/xml/library/catalog.xml \
    -Dxml.catalog.verbosity=1 \
      net.sf.saxon.Transform -r:org.apache.xml.resolver.tools.CatalogResolver \
        -x:org.apache.xml.resolver.tools.ResolvingXMLReader \
        -y:org.apache.xml.resolver.tools.ResolvingXMLReader \
-xsl:/Users/cramerd/Sites/acme/no-can-transclude/E2W.xsl -s:/Users/cramerd/Downloads/9780316434768_redo_dtc/OPS/package.opf -o:/Users/cramerd/xml/generated-index.html

-->
   
<xsl:output method="html" indent="yes" include-content-type="no"/>

<!--root template-->

<xsl:variable name="nav" select="document('/Users/cramerd/Downloads/9780316434768_redo_dtc/OPS/TOC.xhtml')//xhtml:html/xhtml:body/xhtml:nav"/>
<xsl:template match="/">

<html>
<head>
<title><xsl:value-of select="opf:package/opf:metadata/dc:title"/></title>
<meta charset="utf-8" />
<link rel="stylesheet" href="../index.css" type="text/css" />
<meta name="viewport" content="width=device-width" />

</head>
<body>
<xsl:apply-templates mode="nav"/>

<article>
<xsl:apply-templates mode="iframes"/>
</article>
<script src="../nav.js"></script><xsl:text>
</xsl:text>
<script src="../personalization.js"></script><xsl:text>
</xsl:text>
<script src="../links.js"></script><xsl:text>
</xsl:text>
</body>
</html>


</xsl:template>
<!--end root template-->
<xsl:template match="opf:spine" mode="nav">


<nav role="doc-toc">
<ol>
<xsl:for-each select="opf:itemref">
<xsl:variable name="spineIdref" select="@idref"/>
<xsl:variable name="spineItemHref" select="/opf:package/opf:manifest/opf:item[@id=$spineIdref]/@href"/>

<xsl:variable name="sequence">
<xsl:number format="001"/>
</xsl:variable>


<xsl:variable name="spineItemTitle" select="$nav//xhtml:li[xhtml:a[@href = $spineItemHref]]/xhtml:a"/>

<li><a href="#c{$sequence}"><xsl:value-of select="$spineItemTitle"/></a></li>
</xsl:for-each>
</ol>
</nav>
</xsl:template>


<xsl:template match="opf:spine" mode="iframes">


<xsl:for-each select="opf:itemref">
<xsl:variable name="spineIdref" select="@idref"/>
<xsl:variable name="spineItemHref" select="/opf:package/opf:manifest/opf:item[@id=$spineIdref]/@href"/>

<xsl:variable name="sequence">
<xsl:number format="001"/>
</xsl:variable>


<xsl:variable name="spineItemTitle" select="$nav//xhtml:li[xhtml:a[@href = $spineItemHref]]/xhtml:a"/>

<iframe src="{$spineItemHref}" id="c{$sequence}" name="c{$sequence}"></iframe><xsl:text>
</xsl:text>
</xsl:for-each>



</xsl:template>

<xsl:template match="opf:metadata" mode="iframes"/>
<xsl:template match="opf:metadata" mode="nav"/>




</xsl:stylesheet>