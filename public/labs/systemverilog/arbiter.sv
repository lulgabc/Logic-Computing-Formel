// Two-request priority arbiter. At most one grant is asserted.
module arbiter (
  input  logic       clk,
  input  logic       rst_n,
  input  logic [1:0] req,
  output logic [1:0] gnt
);

  always_ff @(posedge clk or negedge rst_n) begin
    if (!rst_n) begin
      gnt <= 2'b00;
    end else if (req[0]) begin
      gnt <= 2'b01;
    end else if (req[1]) begin
      gnt <= 2'b10;
    end else begin
      gnt <= 2'b00;
    end
  end

endmodule
