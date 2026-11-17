// SVA version of the mutual-exclusion property.
// This file can be linted by Verilator 5.x with: --assert --lint-only
module arbiter_sva (
  input  logic       clk,
  input  logic       rst_n,
  input  logic [1:0] req
);

  logic [1:0] gnt;

  arbiter dut (
    .clk(clk),
    .rst_n(rst_n),
    .req(req),
    .gnt(gnt)
  );

  property p_onehot;
    @(posedge clk) disable iff (!rst_n) (gnt != 2'b11);
  endproperty

  assert property (p_onehot);

endmodule
