<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">
<xsl:output method="html" doctype-public="XSLT-compat" omit-xml-declaration="yes" encoding="UTF-8" indent="yes" />
    <xsl:template match="/">
                <!-- create a table to insert those xl element -->
                <table id="bookshoptable" >  
                    <thead> 
                        <tr>
                            <th colspan="4"></th>
                        </tr>                
                    <tr>
                        <!-- first line/head of the table, total of 04 columns -->                       
                        <th>Title</th>
                        <th>Year of Relesase</th>
                        <th>Price</th>
                         <th>Category</th>
                    </tr>
                    </thead>

                    <tbody>
                    <!-- insert the loop to read all categories of books and then titles, year and price -->
                    <!-- keep same lower/uppercase of xml -->
                    <xsl:for-each select="BOOKSHOP/BOOK">
                        <!-- adding changes to select and delete rows -->
                        
                    <tr id="{position()}">
                                 <td colspan="4">
                                <xsl:value-f select="@BOOK" />
                            </td>
                        </tr>
                        <!-- ending of those changes -->
                        <tr>
                            <td><xsl:value-of select="TITLE" /></td>
                             <td><xsl:value-of select="YEAR" /></td>
                            <td><xsl:value-of select="PRICE" /></td>
                            <td><xsl:value-of select="CATEGORY" /></td>
                        </tr>
                    </xsl:for-each>      
                </tbody>    
                </table>
        </xsl:template>

    <!-- should O keep this code? -->
    <xsl:template match="@*|node()">
        <xsl:copy>
            <xsl:apply-templates select="@*|node()"/>
        </xsl:copy>
    </xsl:template> 
    
</xsl:stylesheet>