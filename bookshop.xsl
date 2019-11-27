<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" doctype-public="XSLT-compat" omit-xml-declaration="yes" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
    <html>
    <body>
     
                <!-- create a table to insert those xl element -->
                <table>
                    <!-- table structure -->
                    <tr>
                        <!-- first line/head of the table, total of 04 columns -->
                        <th>Category</th>
                        <th>Title</th>
                        <th>Year of Relesase</th>
                        <th>Price</th>
                    </tr>
                    <!-- insert the loop to read all categories of books and then titles, year and price -->
                    <xsl:for-each select="/bookshop/book">
                        <tr>
                            <td><xsl:value-of select="@category" /></td>
                            <td><xsl:value-of select="title" /></td>
                            <td><xsl:value-of select="year" /></td>
                            <td><xsl:value-of select="price" /></td>
                        </tr>
                    </xsl:for-each>                     

                </table>
                <!-- end -->
                </body>
                </html>			 
    </xsl:template>

    <! --<xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template> -->
    
</xsl:stylesheet>