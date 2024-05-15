import mjml2html from 'mjml'

export type RmOrderArg = {
  name: string,
  billingId: string,
  purchaseDate: string,
  expectedDeliveryDate: string,
  orderStatus: string,
  orderRemark: string,
  rawMaterialSKU: string,
  batchNo: number,
  quantity: number,
}

export const SFGStatusUpdateTemplate = (arg: RmOrderArg) => {
  const template = mjml2html(`<mjml>
  <mj-head>
    <mj-font name="Raleway" href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;700" />
    <mj-preview>RM Order Status: ${arg.orderStatus}</mj-preview>
  </mj-head>
  <mj-body>
    <mj-wrapper padding="50px 30px" background-color="#fafafa">
      <mj-section background-color="#4F46E5" border-radius="8px">

        <mj-column>
          <mj-image width="72px" height="72px" padding="0" border-radius="50%" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2RfMTgyMTkyXzcwNikiPgo8cGF0aCBkPSJNNiAzMkM2IDE1LjQzMTUgMTkuNDMxNSAyIDM2IDJDNTIuNTY4NSAyIDY2IDE1LjQzMTUgNjYgMzJDNjYgNDguNTY4NSA1Mi41Njg1IDYyIDM2IDYyQzE5LjQzMTUgNjIgNiA0OC41Njg1IDYgMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSI2IiB5PSIyIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHJ4PSIzMCIgZmlsbD0idXJsKCNwYXR0ZXJuMF8xODIxOTJfNzA2KSIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfMTgyMTkyXzcwNiIgeD0iMCIgeT0iMCIgd2lkdGg9IjcyIiBoZWlnaHQ9IjcyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjQiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTgyMTkyXzcwNiIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18xODIxOTJfNzA2IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8cGF0dGVybiBpZD0icGF0dGVybjBfMTgyMTkyXzcwNiIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMTgyMTkyXzcwNiIgdHJhbnNmb3JtPSJzY2FsZSgwLjAwMikiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF8xODIxOTJfNzA2IiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFoZ0FBQUhBQ0FZQUFBREwxdCtLQUFBQUNYQk1BQUk3RUFBQUt4QUdWS3c0YkFBQUFPM1JGV0hSQ29tbWVudEBIeHI6ZDpEQUYtbzdmVE9vYzo1LGo6MTgxNTM3NDIyMzU3MzUzNDc1NCx0OjI0MDQwMjA0dlV1bUd1QUFBQVQxYVZSWVZGWE5UTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJz4KICAgICAgICA8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgICAgICAgPGRjOnRpdGxlPgogICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+SW5pdGlhbCBaIC0gMTwvcmRmOmxpPgogICAgICAgIDwvcmRmOkFsdD4KICAgICAgICA8L2RjOnRpdGxlPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOkF0dHJpYj0naHR0cDovL25zLmF0dHJpYnV0aW9uLmNvbS9hZHMvMS4wLyc+CiAgICAgICAgPEF0dHJpYjpBZHM+CiAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgICAgICAgPEF0dHJpYjpDcmVhdGVkPjIwMjQtMDQtMDI8L0F0dHJpYjpDcmVhdGVkPgogICAgICAgIDxBdHRyaWI6RXh0SWQ+ZWMyNmNlZDMtMmI1OS00M2MwLThjMDktNDkxN2RkNzcyNTg4PC9BdHRyaWI6RXh0SWQ+CiAgICAgICAgPEF0dHJpYjpGYklkPjUyNTI2NTkxNDE3OTU4MDwvQXR0cmliOkZiSWQ+CiAgICAgICAgPEF0dHJpYjpUb3VjaFR5cGU+MjwvQXR0cmliOlRvdWNoVHlwZT4KICAgICAgICA8L3JkZjpsaT4KICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgPC9BdHRyaWI6QWRzPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgICAgICAgPHBkZjpBdXRob3I+UHJham5hIFByYXlhczwvcGRmOkF1dGhvcj4KICAgICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KCiAgICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICAgICAgICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+Q2FudmE8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgICAKICAgICAgICA8L3JkZjpSREY+CiAgICAgICAgPC94OnhtcG1ldGE+ag9sbjwSZGVmcz4KPC9zdmc+" />
          <mj-text align="center" color="#fff" font-size="22px">
            Semi Finished Goods Status Update
          </mj-text>
        </mj-column>

      </mj-section>



      <mj-section>
        <mj-column>
          <mj-text font-size="16px">
             Semi finished good SIDE-RAIL material 
number 23774774 has been hydroformed at 
workstation HYDRO-7. The process has been 
carried out without any equipment malfunction.

          </mj-text>
        </mj-column>

      </mj-section>
      <mj-section padding="20px" background-color="#E0E7FF" border-radius="8px">
        <mj-column>
          <mj-text font-size="18px" font-weight="bold" padding-bottom="15px">Order Details</mj-text>
          <mj-table>
            <tr>
              <td style="padding-bottom:5px;">OEM Order No.:</td>
              <td style="padding-bottom:5px">#987654321</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Delivery Date:</td>
              <td style="padding-bottom:5px">TBD</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Expected Delivery Date:</td>
              <td style="padding-bottom:5px">April 15, 2023</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">OEM:</td>
              <td style="padding-bottom:5px">Maruti Suziki</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Batch NO.:</td>
              <td style="padding-bottom:5px">32758946</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Quantity:</td>
              <td style="padding-bottom:5px">1260</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Material Discription:</td>
              <td style="padding-bottom:5px">MM_CHASSIS_SIDE1</td>
            </tr>
            <tr>
              <td>Order Status:</td>
              <td style=" background: #26c281 ; padding: 4px; border-radius:8px;">Ontime</td>
            </tr>
          </mj-table>

        </mj-column>
      </mj-section>
      <mj-section></mj-section>
      <mj-section padding="20px" background-color="#E0E7FF" border-radius="8px">
        <mj-column>
          <mj-text font-size="18px" font-weight="bold" padding-bottom="15px">Operating Parameters</mj-text>
          <mj-table>
            <tr>
              <td style="padding-bottom:5px;">Hydroforming Date:</td>
              <td style="padding-bottom:5px"> 12the May 2024</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Shift:</td>
              <td style="padding-bottom:5px">B</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Workstation:</td>
              <td style="padding-bottom:5px">1200 MPA</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Initial Pressure:</td>
              <td style="padding-bottom:5px">Maruti Suziki</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Final Pressure:</td>
              <td style="padding-bottom:5px">1350MPA</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">RAM Speed:</td>
              <td style="padding-bottom:5px">3.5 mm2/sec</td>
            </tr>
            <tr>
              <td style="padding-bottom:5px">Cycle Time:</td>
              <td style="padding-bottom:5px"> 120 secs</td>
            </tr>
          </mj-table>

        </mj-column>
      </mj-section>
      <mj-section padding-bottom="0px">
        <mj-column>
          <mj-button align="center" background-color="#4b7bec" href="#" font-size="16px" padding="15px 30px">
            Track Consignment
          </mj-button>
          <mj-text font-size="14px" align="center" padding-top="15px" padding-bottom="15px">
            If you have any questions or need further assistance
            you can contact Amar Steelworks via below channels.
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section  padding-top="0px">
        <mj-column>
          <mj-button align="center" background-color="#4b7bec" href="#" font-size="16px" padding="15px 30px">
              Track Consignment
            </mj-button>
        </mj-column>
        <mj-column>
          <mj-button align="center" background-color="#4b7bec" href="#" font-size="16px" padding="15px 30px">
              Track Consignment
            </mj-button>
        </mj-column>
          </mj-section>

      <mj-section padding="20px" background-color="#4F46E5" border-radius="8px">
        <mj-column>
          <mj-text align="center" font-size="12px" line-height="1.5" color="#fff">
            If you have any questions or need further assistance, please contact<br />
            our customer service team.<br />
            Email: <a href="mailto:support@company.com" style="color:#f1f1f1">support@zuttoo.com</a><br />
            Call: 1-800-123-456<br />
            Warm Regards,<br />
            Zuttoo Team
          </mj-text>
        </mj-column>
      </mj-section>
      <mj-section>
        <mj-column>
          <mj-image width="72px" height="72px" padding="0" border-radius="50%" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNzIiIGhlaWdodD0iNzIiIHZpZXdCb3g9IjAgMCA3MiA3MiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIwX2RfMTgyMTkyXzcwNikiPgo8cGF0aCBkPSJNNiAzMkM2IDE1LjQzMTUgMTkuNDMxNSAyIDM2IDJDNTIuNTY4NSAyIDY2IDE1LjQzMTUgNjYgMzJDNjYgNDguNTY4NSA1Mi41Njg1IDYyIDM2IDYyQzE5LjQzMTUgNjIgNiA0OC41Njg1IDYgMzJaIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSI2IiB5PSIyIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHJ4PSIzMCIgZmlsbD0idXJsKCNwYXR0ZXJuMF8xODIxOTJfNzA2KSIvPgo8L2c+CjxkZWZzPgo8ZmlsdGVyIGlkPSJmaWx0ZXIwX2RfMTgyMTkyXzcwNiIgeD0iMCIgeT0iMCIgd2lkdGg9IjcyIiBoZWlnaHQ9IjcyIiBmaWx0ZXJVbml0cz0idXNlclNwYWNlT25Vc2UiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0ic1JHQiI+CjxmZUZsb29kIGZsb29kLW9wYWNpdHk9IjAiIHJlc3VsdD0iQmFja2dyb3VuZEltYWdlRml4Ii8+CjxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VBbHBoYSIgdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDEyNyAwIiByZXN1bHQ9ImhhcmRBbHBoYSIvPgo8ZmVPZmZzZXQgZHk9IjQiLz4KPGZlR2F1c3NpYW5CbHVyIHN0ZERldmlhdGlvbj0iMyIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4xIDAiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbjI9IkJhY2tncm91bmRJbWFnZUZpeCIgcmVzdWx0PSJlZmZlY3QxX2Ryb3BTaGFkb3dfMTgyMTkyXzcwNiIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18xODIxOTJfNzA2IiByZXN1bHQ9InNoYXBlIi8+CjwvZmlsdGVyPgo8cGF0dGVybiBpZD0icGF0dGVybjBfMTgyMTkyXzcwNiIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMTgyMTkyXzcwNiIgdHJhbnNmb3JtPSJzY2FsZSgwLjAwMikiLz4KPC9wYXR0ZXJuPgo8aW1hZ2UgaWQ9ImltYWdlMF8xODIxOTJfNzA2IiB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFoZ0FBQUhBQ0FZQUFBREwxdCtLQUFBQUNYQk1BQUk3RUFBQUt4QUdWS3c0YkFBQUFPM1JGV0hSQ29tbWVudEBIeHI6ZDpEQUYtbzdmVE9vYzo1LGo6MTgxNTM3NDIyMzU3MzUzNDc1NCx0OjI0MDQwMjA0dlV1bUd1QUFBQVQxYVZSWVZGWE5UTDpjb20uYWRvYmUueG1wAAAAAAA8eDp4bXBtZXRhIHhtbG5zOng9J2Fkb2JlOm5zOm1ldGEvJz4KICAgICAgICA8cmRmOlJERiB4bWxuczpyZGY9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMnPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOmRjPSdodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyc+CiAgICAgICAgPGRjOnRpdGxlPgogICAgICAgIDxyZGY6QWx0PgogICAgICAgIDxyZGY6bGkgeG1sOmxhbmc9J3gtZGVmYXVsdCc+SW5pdGlhbCBaIC0gMTwvcmRmOmxpPgogICAgICAgIDwvcmRmOkFsdD4KICAgICAgICA8L2RjOnRpdGxlPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOkF0dHJpYj0naHR0cDovL25zLmF0dHJpYnV0aW9uLmNvbS9hZHMvMS4wLyc+CiAgICAgICAgPEF0dHJpYjpBZHM+CiAgICAgICAgPHJkZjpTZXE+CiAgICAgICAgPHJkZjpsaSByZGY6cGFyc2VUeXBlPSdSZXNvdXJjZSc+CiAgICAgICAgPEF0dHJpYjpDcmVhdGVkPjIwMjQtMDQtMDI8L0F0dHJpYjpDcmVhdGVkPgogICAgICAgIDxBdHRyaWI6RXh0SWQ+ZWMyNmNlZDMtMmI1OS00M2MwLThjMDktNDkxN2RkNzcyNTg4PC9BdHRyaWI6RXh0SWQ+CiAgICAgICAgPEF0dHJpYjpGYklkPjUyNTI2NTkxNDE3OTU4MDwvQXR0cmliOkZiSWQ+CiAgICAgICAgPEF0dHJpYjpUb3VjaFR5cGU+MjwvQXR0cmliOlRvdWNoVHlwZT4KICAgICAgICA8L3JkZjpsaT4KICAgICAgICA8L3JkZjpTZXE+CiAgICAgICAgPC9BdHRyaWI6QWRzPgogICAgICAgIDwvcmRmOkRlc2NyaXB0aW9uPgoKICAgICAgICA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0nJwogICAgICAgIHhtbG5zOnBkZj0naHR0cDovL25zLmFkb2JlLmNvbS9wZGYvMS4zLyc+CiAgICAgICAgPHBkZjpBdXRob3I+UHJham5hIFByYXlhczwvcGRmOkF1dGhvcj4KICAgICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KCiAgICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICAgICAgICB4bWxuczp4bXA9J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8nPgogICAgICAgIDx4bXA6Q3JlYXRvclRvb2w+Q2FudmE8L3htcDpDcmVhdG9yVG9vbD4KICAgICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgICAgICAKICAgICAgICA8L3JkZjpSREY+CiAgICAgICAgPC94OnhtcG1ldGE+ag9sbjwSZGVmcz4KPC9zdmc+" />
        </mj-column>
        <mj-column>
          <mj-text align="center" >
            Visit Zuttoo Home
          </mj-text>
        </mj-column>
      </mj-section>
    </mj-wrapper>
  </mj-body>
</mjml>`);



return { html: template.html }
}